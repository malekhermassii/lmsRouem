module.exports = (app)=>{
    const admins = require("../controllers/admin.controller")
    const authorizeRoles = require("../middleware/authorizeRoles")
    // admin routes
    // create(post) , affichage(all , one)(get) , update(put) , delete(delete)
    app.post("/admins" , admins.createAdmin )
    app.get("/admins" , admins.findAll)
    app.get("/admins/:adminId" , admins.findOne)
    app.put("/admins/:adminId" , admins.UpdateAdmin)
    app.delete("/admins/:adminId", admins.DeleteAdmin)
    app.post("/loginAdmin" , admins.login)
    app.get("/logoutAdmin" , admins.logout)
}
