module.exports = (app)=>{
    const students = require("../controllers/student.controller")
    // student routes
    // create(post) , affichage(all , one)(get) , update(put) , delete(delete)
    app.post("/students" , students.createStudent )
    app.get("/students" , students.findAll)
    app.get("/students/:studentId" , students.findOne)
    app.put("/students/:studentId" , students.updateStudent)
    app.delete("/students/:studentId", students.deleteStudent)
    app.post("/login" , students.login)
    app.get("/logout" , students.logout)
    
}
