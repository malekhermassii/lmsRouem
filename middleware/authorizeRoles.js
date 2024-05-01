// Import the JSON Web Token (JWT) library to use for verifying tokens.
const jwt = require('jsonwebtoken');
// Import the User model so we can access user data from the database.
const User = require('../models/admin.model');  // Make sure the path to your user model is correct.
// Define a function `authorizeRoles` that will be used as middleware in your Express routes.
// This function accepts any number of roles which are allowed to access the route.
const authorizeRoles = (...permittedRoles) => {
    // Return an asynchronous function that Express will use as middleware.
    return async (req, res, next) => {
        try {
            // Extract the 'Authorization' header from the incoming HTTP request.
            const authHeader = req.headers.authorization;

            // Check if the 'Authorization' header is missing or doesn't start with 'Bearer'.
            // This is typical for JWTs sent as Bearer tokens.
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                // If the check fails, respond with a 401 Unauthorized status.
                return res.status(401).json({ message: "Unauthorized: No token provided" });
            }
            // Split the 'Authorization' header to get the token part after 'Bearer '.
            const token = authHeader.split(' ')[1];
            // Verify the token using the JWT secret set in your environment variables.
            // This will throw an error if the token is invalid or expired.
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Find the user in the database using the ID extracted from the decoded token.
            const user = await User.findById(decoded.id);
            // Attach the user object to the request object so it can be used in downstream middleware or routes.
            req.user = user;
            // Check if the user's role is one of the roles allowed to access this route.
            if (user && permittedRoles.includes(user.role)) {
                // If the user has a valid role, call `next()` to pass control to the next middleware or route handler.
                next();
            } else {
                // If the user does not have a valid role, respond with a 403 Forbidden status.
                return res.status(403).json({ message: "Forbidden: Insufficient role" });
            }
        } catch (error) {
            // If an error occurs during the token verification or database lookup, respond with a 401 Unauthorized status.
            return res.status(401).json({ message: "Unauthorized: Invalid token or token expired" });
        }
    };
};
// Export the `authorizeRoles` function so it can be imported and used in other parts of your application.
module.exports = authorizeRoles;
