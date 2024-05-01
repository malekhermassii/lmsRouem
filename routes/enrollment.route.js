module.exports = (app)=>{
    const enrollment = require("../controllers/enrollment.controller")

    app.post('/enroll', enrollment.enrollStudent);
 
}
// 