module.exports = (app)=>{
    const admins = require("../controllers/admin.controller")
    const authorizeRoles = require("../middleware/authorizeRoles")
    // admin routes
    // create(post) , affichage(all , one)(get) , update(put) , delete(delete)
    app.post("/admins" ,authorizeRoles("admin"), admins.createAdmin )
    app.get("/admins" ,authorizeRoles("admin"), admins.findAll)
    app.get("/admins/:adminId" ,authorizeRoles("admin"), admins.findOne)
    app.put("/admins/:adminId" ,authorizeRoles("admin"), admins.UpdateAdmin)
    app.delete("/admins/:adminId",authorizeRoles("admin"), admins.DeleteAdmin)
    app.post("/loginAdmin" , admins.login)
    app.get("/logoutAdmin" , admins.logout)
}
