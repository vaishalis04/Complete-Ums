const mongoose = require('mongoose');

const DesignationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    remark: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    core: {
        type: Boolean,
    },
    topDesignation: {
        type: String,
        // ref: 'Designation'
    },
    isDelete: {
        type: Boolean,
        default: false,
    },
});

const Designation = mongoose.model("Designation", DesignationSchema);

module.exports = Designation;
