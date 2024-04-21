module.exports = (app)=>{
    const courses = require("../controllers/course.controller")
    // course routes
    // create(post) , affichage(all , one)(get) , update(put) , delete(delete)
    app.post("/courses" , courses.createCourse )
    app.get("/courses" , courses.findAllCourse)
    app.get("/courses/:couseId" , courses.findOneCourse)
    app.put("/courses/:couseId" , courses.updateCourse)
    app.delete("/courses/:couseId", courses.DeleteCourse)
    // videos routes
    // create , update , delete
    // html
    app.post("/courses/:couseId/videos" , courses.createVideo)
    app.put("/courses/:couseId/videos/videoId" , courses.updateVideo)
    app.delete("/courses/:couseId/videos/videoId")
}
