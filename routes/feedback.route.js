module.exports = (app)=>{
    const feedbacks = require("../controllers/feedback.controller")
    // feedback routes
    // create(post) , affichage(all , one)(get) , update(put) , delete(delete)
    app.post("/feedbacks" , feedbacks.createfeedback)
    app.get("/feedbacks" , feedbacks.findAll)
    app.get("/feedbacks/:feedbackId" , feedbacks.findOne)
    app.put("/feedbacks/:feedbackId" , feedbacks.Updatefeedback)
    app.delete("/feedbacks/:feedbackId", feedbacks.deletefeedback)
 
}
// 