const Course = require("../models/course.model");

exports.createCourse = async (req, res) => {
    try {
        const { name, description, topic, price } = req.body;
        const image = req.files['image'][0] ? req.files['image'][0].filename : null;

        // Extract filenames from video files
        const videos = req.files['videos'].map(file => ({ videoURL: file.filename })); // Update property name to videoURL

        const courseData = {
            name,
            description,
            topic,
            price,
            image,
            videos, // Store filenames instead of IDs
        };

        const course = new Course(courseData);
        await course.save();
        res.status(201).json(course);
        console.log(course);
    } catch (error) {
        res.status(400).json({ message: "Error while creating the course", error: error.message });
    }
};
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
exports.updateCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const { name, description, topic, price } = req.body;
        const image = req.files && req.files['image'] ? req.files['image'][0].filename : null;
        const videos = req.files && req.files['videos'] ? req.files['videos'].map(file => ({ videoURL: file.filename })) : null;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Update course details
        if (name) course.name = name;
        if (description) course.description = description;
        if (topic) course.topic = topic;
        if (price) course.price = price;
        if (image) course.image = image;
        if (videos) course.videos = videos; // Overwrites existing videos

        await course.save();
        res.status(200).json(course);
    } catch (error) {
        console.error("Error while updating the course:", error);
        res.status(400).json({ message: "Error while updating the course", error: error.message });
    }
};
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
exports.createVideo = async (req, res) => {
    const courseId = req.params.courseId;
    const { title, description, videoURL } = req.body; // Ensure property name matches with frontend
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        course.videos.push({ title, description, videoURL });
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ message: "Error while creating the video" });
    }
};
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







// exports.createCourse = async (req , res)=>{
    //     try{
    //         const course = new Course({
    //             name: req.body.name ,
    //             description : req.body.description ,
    //             topic : req.body.topic ,
    //             price : req.body.price,
    //             videos : req.body.videos, //we gonna chnage it 
    //             // image = couverture
    //             image : req.body.image,      
    //         })
    //         await course.save()
    //         res.status(201).json(course)
    //     }
    //     catch (error){
    //         res.status(400).json({message : "error while creating the course"})
    //     }
    // }