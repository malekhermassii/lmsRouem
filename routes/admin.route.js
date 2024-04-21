module.exports = (app)=>{
    const admins = require("../controllers/admin.controller")
    // admin routes
    // create(post) , affichage(all , one)(get) , update(put) , delete(delete)
    app.post("/admins" , admins.createAdmin )
    app.get("/admins" , admins.findAll)
    app.get("/admins/:adminId" , admins.findOne)
    app.put("/admins/:adminId" , admins.UpdateAdmin)
    app.delete("/admins/:adminId", admins.DeleteAdmin)
    app.post("/login" , admins.login)
    app.get("/logout" , admins.logout)
    
}
