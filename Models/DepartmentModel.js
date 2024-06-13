const mongoose= require('mongoose')


const Departments = new mongoose.Schema({
    
departmentName:{
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }, 
    isDelete:{
        type:Boolean,
        default:false
    },
    remark: {
        type:String
    },
}
) 
const Department = mongoose.model("Department", Departments);
module.exports = Department;