const Course = require("../models/course.model")
exports.createCourse = async (req , res)=>{
    try{
        const course = new Course({
            name: req.body.name ,
            description : req.body.description ,
            topic : req.body.topic ,
            price : req.body.price,
            videos : req.body.videos, //we gonna chnage it 
            // thumbnail = couverture
            thumbnail : req.body.thumbnail,      
        })
        await course.save()
        res.status(201).json(course)
    }
    catch (error){
        res.status(400).json({message : "error while creating the course"})
    }
}
// display all courses 
exports.findAllCourse = (req , res)=>{
    // find
    Course.find()
    .then((courses)=>{
        res.send(courses)
    })
    .catch((error)=>{
        res.status(500).send({
            message: error.message || "server side error"
        })
    })
}
exports.findOneCourse = (req , res)=>{
    // findById
    Course.findById(req.params.courseId)
    .then((course)=>{
        if(!course){
            return res.status(404).send({
                message : "course not found with this id"+ req.params.courseId
            })
        }
        res.send(course)
    })
    .catch((error)=>{
        res.status(500).send({
            message: error.message || "server side error"
        })
    })
}
exports.updateCourse = async (req, res)=>{
    Course.findByIdAndUpdate(req.params.courseId , {
        name: req.body.name ,
        description : req.body.description ,
        topic : req.body.topic ,
        price : req.body.price,
        videos : req.body.videos, //we gonna chnage it 
        thumbnail : req.body.thumbnail, 
    } , 
    { new : true})
    .then((course)=>{
        if(!course){
            return res.status(404).send({
                message : "course not found with this id"+ req.params.courseId
            })
        }
        res.send(course)
    })
    .catch((error)=>{
        res.status(500).send({
            message: error.message || "server side error"
        })
    })
}
exports.DeleteCourse = (req , res)=>{
    Course.findByIdAndDelete(req.params.courseId)
    .then((course)=>{
        if(!course){
            return res.status(404).send({
                message : " course not found with this id" + req.params.courseId
            })
        }
        res.send({ 
            message : "course deleted successfully"
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message: error.message || "server side error"
        })
    })
}
exports.createVideo = async (req , res)=>{
    const courseId = req.params.courseId
    const {title , description , videoURL} = req.body
    try{
       const course = await Course.findById(courseId)
       if(!course){
        return res.status(404).json({message : "course not found"})
       }
    // push = to element to the array
       course.videos.push({title , description , videoURL})
       await course.save()
       res.status(201).json(course)
    }
    catch (error){
        res.status(400).json({message : "error while creating the video"})
    }
}
exports.updateVideo = async (req , res)=>{
    // courseId , videoId
    const courseId = req.params.courseId ; 
    const videoId = req.params.videoId ; 
    const {title , description , videoURL} = req.body
    try{
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({message : "course not found"})
        }
        const video = course.videos._id(videoId)
        if(!video){
            return res.status(404).json({message : "video not found"})
        }
        video.title = title ; 
        video.description = description ; 
        video.videoURL = videoURL ; 
        await course.save()
        res.json(course)
    }
    catch (error){
        res.status(400).json({message : error.massage})
    }
}
exports.deleteVideo = async (req, res)=>{
     const courseId = req.params.courseId ; 
     const videoId = req.params.videoId ; 
     try{
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({message : "course not found"})
        }
        // pull(id)
        course.videos.pull({_id : videoId})
        res.json(course)
    }
    catch (error){
        res.status(400).json({message : error.massage})
    }

}