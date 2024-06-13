const mongoose = require("mongoose")
const Institutes = new mongoose.Schema({
  fullName:{
    type: String,
    required: true,
},
shortName:{
    type: String,
    required: true, 
},
contactNumber:{
    type: Number,
    required: true, 
},
email:{
    type:String,
    required:true
},
username:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return this.password === v;
      },
      message: "Password and Confirm Password do not match"
    }
  },
  instituteCode:{
    type:Number,
    required:true
  },
//   core: {
//     type:Boolean
// },
    isDelete:{
        type:Boolean,
default:false
    }

})
const Institute = mongoose.model("Institute", Institutes);
module.exports = Institute;