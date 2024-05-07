module.exports = (app)=>{
    const users = require("../controllers/user.controller")
    // user routes
    // create(post) , affichage(all , one)(get) , update(put) , delete(delete)
    app.post("/users" , users.createUser )
    app.get("/users" , users.findAll)
    app.get("/users/:userId" , users.findOne)
    app.put("/users/:userId" , users.updateUser)
    app.delete("/users/:userId", users.deleteUser)
    app.post("/login" , users.login)
    app.get("/logout" , users.logout)
    
}
