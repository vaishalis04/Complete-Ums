// FillEnrollmentModel.js

const mongoose = require('mongoose');

const FillEnrollmentSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String
    },
    fullName: {
        type: String
    },
    fatherName: {
        type: String
    },
    motherName: {
        type: String
    },
    gender: {
        type: String
    },
    dob: Date,
    religion: {
        type: String
    },
    category: {
        type: String
    },
    studentContact: {
        type: String
    },
    studentMail: {
        type: String
    },
    studentEnrollment: {
        type: String
    },
    studentRollNumber: {
        type: String
    },
    bloodGroup: {
        type: String
    },
    pwd: {
        type: String
    },
    placeOfBirth: {
        type: String
    },
    motherTongue: {
        type: String
    },
    nationality: {
        type: String
    },
    domicile: {
        type: String
    },
    ruralOrUrban: {
        type: String
    },
    nri: {
        type: String
    },
    fatherOccupation: {
        type: String
    },
    fatherAnnualIncome: {
        type: String
    },
    fatherContact: {
        type: String
    },
    motherOccupation: {
        type: String
    },
    motherAnnualIncome: {
        type: String
    },
    motherContact: {
        type: String
    },
    localGuardianName: {
        type: String
    },
    localGuardianContact: {
        type: String
    },
    permanent_country: {
        type: String
    },
            permanent_state: {
                type: String
            },
            permanent_city: {
                type: String
            },
            permanent_street: {
                type: String
            },
            permanent_pincode: {
                type: String
            },
            correspondence_country: {
                type: String
            },
            correspondence_state: {
                type: String
            },
            correspondence_city: {
                type: String
            },
            correspondence_street: {
                type: String
            },
            correspondence_pincode: {
                type: String
            },
            high_board:{
                type: String
            },
            high_passingYear:{
                type: String
            },
            high_marksObtained:{
                type: String
            },
            high_totalMarks:{
                type: String
            },
            high_percentage:{
                type: String
            },
            higher_board:{
                type: String
            },
            higher_passingYear:{
                type: String
            },
            higher_marksObtained:{
                type: String
            },
            higher_totalMarks:{
                type: String
            },
            higher_percentage:{
                type: String
            },
            higher_stream:{
                type: String
            }
});

const FillEnrollmentModel = mongoose.model('FillEnrollment', FillEnrollmentSchema);

module.exports = FillEnrollmentModel;
