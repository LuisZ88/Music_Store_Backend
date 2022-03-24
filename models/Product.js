const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    trademark:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
        default: 0,
        currency: "EUR"
    },
    picture:{
        type: Object,
    },
    description:{
        type: String,
        required: true,
    },
    stock:{
        type: Number
    },
    subCat:{
        type: String,
    },
    special:{
        type: String,
    },
    category:{
        type: String,
        required:true,
    }
},{
timestamps: true,
versionKey: false,
})
module.exports = mongoose.model("Product", ProductSchema)