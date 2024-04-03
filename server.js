const express = require("express") ; 
const app = express()
const port = 3002
app.get('/' , (req , res)=> {
    res.send('our LMS is working')
})
app.listen(port , ()=> {
    console.log(`our app is working ou port ${port}`)
} )