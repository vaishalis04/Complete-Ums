const express = require("express");
const router = express.Router();
const multer = require('multer');
const {
  addDesignation,
  allDesignation,
  updateDesignation,
  crudUpdateId,
  deleteDesignation,
  addDepartment,
  allDepartment,
  updateDepartment,
  departmentUpdate,
  deleteDepartment,
  addUser,
  allUser,
  updateUser,
  userUpdate,
  deleteUser,
  addPermission,
  allPermission,
  addInstitute,
  allInstitute,
  updateInstitute,
  deleteInstitute,
  instituteUpdate,
  addResponsibility,
  loginUser,
  authenticateToken,
  logoutUser,
  allResponsibility
  ,uploadStudentFile,
  getAllStudentsFile,readUploadedFile,getUploadedStudents,EnrollmentByStudent,
  EnrollmentByStudentRead,EnrollmentStudentsDoc
} = require("../Controllers/User_Controller");

// code for Institute
router.route("/newinstitute").post(authenticateToken,addInstitute);
router.route("/allinstitute").get(authenticateToken,allInstitute);
router.route("/updateinstitute/:id").put(authenticateToken,updateInstitute);
router.route("/updateinstitute/:id").get(authenticateToken,instituteUpdate);
router.route("/deleteinstitute/:id").delete(authenticateToken,deleteInstitute);



// code for Designation
router.route("/newdesignation").post(authenticateToken,addDesignation);
router.route("/alldesignation").get(allDesignation);
router.route("/updatedesignation/:id").put(authenticateToken,updateDesignation);
router.route("/updatedesignation/:id").get(authenticateToken,crudUpdateId);
router.route("/deletedesignation/:id").delete(authenticateToken,deleteDesignation);

// code for Department

router.route("/newdepartment").post(authenticateToken,addDepartment);
router.route("/alldepartment").get(authenticateToken,allDepartment);
router.route("/updatedepartment/:id").put(authenticateToken,updateDepartment);
router.route("/updatedepartment/:id").get(authenticateToken,departmentUpdate);
router.route("/deletedepartment/:id").delete(authenticateToken,deleteDepartment);

// code for Users
router.route("/newuser").post(addUser);
router.route("/login").post(loginUser)
router.route("/logout").get(authenticateToken,logoutUser)
router.route("/alluser").get(authenticateToken,allUser);
router.route("/updateuser/:id").put(authenticateToken,updateUser);
router.route("/updateuser/:id").get(authenticateToken,userUpdate);
router.route("/deleteuser/:id").delete(authenticateToken,deleteUser);

// code for permission
router.route("/addpermission").post(authenticateToken,addPermission);
router.route("/allpermission").get(authenticateToken,allPermission);

// code for Responsibility
router.route("/addresponsibility").post(authenticateToken,addResponsibility);
router.route("/allresponsibility").get(authenticateToken,allResponsibility);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+"_"+file.originalname); 
  }
});

const upload = multer({ storage: storage });


router.post('/upload', upload.single('file'), uploadStudentFile);
router.route("/getstudents").get(getAllStudentsFile);
router.post('/read/:id', readUploadedFile);
router.route("/getUploadedStudents").get(getUploadedStudents);
               // code for EnrollmentByStudent
router.route("/enrollmentStudents").post(EnrollmentByStudent);
router.get('/enrollmentStudentsread/:id', EnrollmentByStudentRead);
router.post("/enrollmentStudentsDoc",upload.single('file'),EnrollmentStudentsDoc);


module.exports = router;
