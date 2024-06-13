const mongoose = require("mongoose");

const processData = new mongoose.Schema({
    file: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentFile' },
    
    University_Name: {
        type: String
    },
    College_Code_NIC:{
        type: String
    },
    Institute_Name: {
        type: String
    },
    Address: {
        type: String
    },
    District_Name: {
        type: String
    },
    CourseLevel: {
        type: String
    },
    Course_Branch_Code: {
        type: String
    },
    Course_Name: {
        type: String
    },
    Branch_Name: {
        type: String
    },
    Subj1: {
        type: String
    },
    Subj2: {
        type: String
    },
    Subj3: {
        type: String
    },
    Applicant_Id: {
        type: String
    },
    Applicant_Name: {
        type: String
    },
    Father_Name: {
        type: String
    },
    Mother_Name: {
        type: String
    },
    DOB: {
        type: String
    },
    Candidates_Category: {
        type: String
    },
    Class_Name: {
        type: String
    },
    Gender: {
        type: String
    },
    Blood_Group: {
        type: String
    },
    Minority_Group: {
        type: String
    },
    Exam_Board_Name: {
        type: String
    },
    Last_Institute_Name: {
        type: String
    },
    Subject_Group: {
        type: String
    },
    Subject_additional: {
        type: String
    },
    Roll_Number: {
        type: String
    },
    Year: {
        type: String
    }, 
    Marks_obtained: {
        type: String
    },
    Marks_outof: {
        type: String
    },
    University_Exam_Result: {
        type: String
    },
    Domicile: {
        type: String
    },
    Applicant_Address: {
        type: String
    },
    Mobile_Number: {
        type: String
    },
    Email: {
        type: String
    },
    Date_of_Admission: {
        type: String
    }, 
    Admission_Fee: {
        type: String
    },
    Trans_Date: {
        type: String
    }, 
    Admission_Round: {
        type: String
    },
    University_code: {
        type: String
    }
  
});

const Process = mongoose.model("processData", processData);

module.exports = Process;
