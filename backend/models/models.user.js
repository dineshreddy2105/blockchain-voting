const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    aadharid: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    name: String,
    age: Number,
    phone: Number

})

const userModel=mongoose.model("users",userSchema)
module.exports={userModel,userSchema}