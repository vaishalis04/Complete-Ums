const mongoose = require("mongoose");
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { ObjectId } = mongoose.Types; 



const Users = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username:{
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
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
  responsibility: {
    type: String,
    ref: "Responsibility",

  },
  designation: {
    type: String,
    ref: "Designation",
  },
  core: {
    type:Boolean
},
remark: {
    type:String
},
isDelete:{
  type:Boolean,
default:false
},
isAdmin:{
  type:Boolean,
default:false
}
});


const User = mongoose.model("User", Users);
module.exports = User;
