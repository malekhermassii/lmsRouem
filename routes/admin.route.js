module.exports = (app)=>{
    const admins = require("../controllers/admin.controller")
    const authorizeRoles = require("../middleware/authorizeRoles")
    // admin routes
    // create(post) , affichage(all , one)(get) , update(put) , delete(delete)
    app.post("/admins" ,authorizeRoles("super-admin"), admins.createAdmin )
    app.get("/admins" ,authorizeRoles("super-admin"), admins.findAll)
    app.get("/admins/:adminId" ,authorizeRoles("super-admin"), admins.findOne)
    app.put("/admins/:adminId" ,authorizeRoles("super-admin"), admins.UpdateAdmin)
    app.delete("/admins/:adminId",authorizeRoles("super-admin"), admins.DeleteAdmin)
    app.post("/login" , admins.login)
    app.get("/logout" , admins.logout)
}
