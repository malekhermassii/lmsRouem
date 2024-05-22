module.exports = (app) => {
    const users = require("../controllers/user.controller");
    // Public routes
    app.post("/users", users.createUser);
    app.post("/login", users.login);

    // Protected routes
    app.get("/users", users.findAll);
    app.get("/users/:userId", users.findOne);
    app.put("/users/:userId", users.updateUser);
    app.delete("/users/:userId", users.deleteUser);
    
    // Logout does not usually need to be a route if using JWT, since token expiry is handled client-side
    app.get("/logout", users.logout);  // Assuming logout would clear a token on the client-side
};
