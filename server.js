require("dotenv").config()
const express = require("express"),
    mongoose = require("mongoose"),
    PORT = process.env.PORT,
    app = express(),
    URL = process.env.MONGODB_URL,
    ProductRoutes = require('./api/ProductRoutes'),
    AuthRoutes = require('./api/AuthRoutes'),
    createRoles = require('./libs/initialSetup'),
    cors = require('cors')
    fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles: true
}))



app.use(cors())
createRoles()
app.use(express.json())
app.use(express.urlencoded({
    extended: true}))

app.use('/api' , ProductRoutes)
app.use('/api/auth', AuthRoutes)

mongoose.connect(URL).then(() => {
    console.log("DB IS CONNECTED")
})

app.listen(process.env.PORT, () => {
    console.log(`Server listen`)
})
app.get("/",(req,res) =>{
res.json({
    web: 'tienda'
})
})