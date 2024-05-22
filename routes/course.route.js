module.exports = (app)=>{
    const courses = require("../controllers/course.controller")
    // course routes
    // create(post) , affichage(all , one)(get) , update(put) , delete(delete)
    app.post("/courses" , courses.createCourse )
    app.get("/courses" , courses.findAllCourse)
    app.get("/courses/:courseId" , courses.findOneCourse)
    app.put("/courses/:courseId" , courses.updateCourse)
    app.delete("/courses/:courseId", courses.DeleteCourse)
    // videos routes
    // create , update , deletex
    // html
    app.post("/courses/:courseId/videos" , courses.createVideo)
    app.put("/courses/:courseId/videos/videoId" , courses.updateVideo)
    app.delete("/courses/:courseId/videos/videoId" , courses.deleteVideo)
}
