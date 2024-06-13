const mongoose = require("mongoose");

const studentDocUpload = new mongoose.Schema({
    file: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentFile' },
    highRollno:String,
    upload_highMarksheet:String,
    upload_higherMarksheet:String,
    upload_entranceMarksheet:String,
    upload_tc:String,
    upload_migration:String,
    upload_character:String,
    upload_domicile:String,
    upload_gap:String,
    upload_photograph:String,
    upload_digital:String,









    
    
});

const studentDoc = mongoose.model("studentDocUpload", studentDocUpload);

module.exports = studentDoc;
