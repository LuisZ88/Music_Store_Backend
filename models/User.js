const { type } = require("express/lib/response")
const mongoose = require("mongoose")
const Role = require("./Role"),
    bcrypt = require("bcryptjs");
    require("dotenv").config();


const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 3,
        max: 15
    },
    surname:{
        type: String,
        required: true,
        min: 3,
        max: 15
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        min: 6,
        max: 30,
    },
    roles: {
        ref: "Role",
        type: mongoose.Schema.Types.ObjectId
    },
    
    adress:{
        type: String,
    }
},{
timestamps: true,
versionKey: false,
})


UserSchema.statics.encryptPassword = async (password) => {
 const salt = await bcrypt.genSalt(10)
 return bcrypt.hash(password, salt)
}
UserSchema.statics.comparePassword = async (password, userPassword)=>{
    const salt = await bcrypt.genSalt(10)
    return bcrypt.compare(password, userPassword)

}
module.exports = mongoose.model("User", UserSchema)