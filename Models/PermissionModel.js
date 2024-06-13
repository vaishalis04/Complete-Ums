const mongoose= require('mongoose')

const Permissions = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      level: {
        type: String,
        enum: ['1', '2'], 
        required: true
      },
      // permission:{
      //   type:String,
      //   required:true
      // },
      remark:{
        type:String
      }



})
const Permission = mongoose.model("Permission", Permissions);
module.exports = Permission;