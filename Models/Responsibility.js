const mongoose = require("mongoose")

const Responsibilities = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      remark:{
        type:String
      },
      permission: {
        type:String,
        ref: 'Permission'
      },
      remark:{
        type:String
      }
})
const Responsibility = mongoose.model("Responsibility", Responsibilities);
module.exports = Responsibility;