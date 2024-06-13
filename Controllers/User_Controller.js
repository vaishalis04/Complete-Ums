const Designation = require("../Models/DesignationModel");
const Department = require("../Models/DepartmentModel");
const User = require("../Models/UserModel");
const Permission = require("../Models/PermissionModel");
const Institute = require("../Models/InstituteModel");
const Responsibility = require("../Models/Responsibility");
const Student = require("../Models/StudentModel");
const Process = require("../Models/ProcessedData");
const FillEnrollmentModel = require("../Models/FillEnrollmentModel")
const StudentDoc = require("../Models/StudentDocModel")
const xlsx = require("xlsx");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require('fs'); // Node.js filesystem module
const { query } = require("express");

// code for Institute schema
const addInstitute = async (req, res) => {
  try {
    const {
      fullName,
      shortName,
      contactNumber,
      email,
      username,
      password,
      confirmPassword,
      instituteCode,
      core,
    } = req.body;

    if (
      !fullName ||
      !shortName ||
      !contactNumber ||
      !email ||
      !username ||
      !password ||
      !confirmPassword ||
      !instituteCode
    ) {
      return res.status(400).json({
        message:
          "Missing required fields: fullName, shortName, contactNumber, email, username, password, confirmPassword, and instituteCode",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password and Confirm Password do not match",
      });
    }

    const newInstitute = new Institute({
      fullName,
      shortName,
      contactNumber,
      email,
      username,
      password,
      confirmPassword,
      instituteCode,
      core,
    });

    await newInstitute.save();
    res.status(201).json(newInstitute);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ msg: "Error adding institute" });
  }
};
const allInstitute = async (req, res) => {
  try {
    const institutes = await Institute.find();
    res.json(institutes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateInstitute = async (req, res) => {
  try {
    const { id } = req.params; // Assuming institute ID is in the route params
    const updateFields = req.body;

    const existingInstitute = await Institute.findById(id);
    if (!existingInstitute) {
      return res.status(404).json({ message: "Institute not found" });
    }

    // Iterate through the fields in the request body and update them if they exist
    for (const [key, value] of Object.entries(updateFields)) {
      // Handle special cases like confirmPassword
      if (key === "confirmPassword") {
        if (existingInstitute.password !== value) {
          return res
            .status(400)
            .json({ message: "Password and Confirm Password do not match" });
        }
      } else {
        existingInstitute[key] = value;
      }
    }

    await existingInstitute.save();

    res.status(200).json(existingInstitute);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
const instituteUpdate = (req, res) => {
  const id = req.params.id;
  Institute.find({ _id: id }).then((Institute) =>
    res.json({ message: "updated successfully", Institute })
  );
};
const deleteInstitute = async (req, res) => {
  try {
    const item = await Institute.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "item not found" });
    }
    item.isDelete = true;
    await item.save();
    res.json({ message: "deleted" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

// code for Designation schema
const addDesignation = async (req, res) => {
  try {
    const { title, remark, core, topDesignationTitle } = req.body;

    // Validate required fields
    if (!title || !core || !topDesignationTitle) {
      return res.status(400).json({
        message:
          "Missing required fields: title, core, and topDesignationTitle",
      });
    }

    let topDesignation = null;
    if (core) {
      // Find top designation by title (assuming a unique title constraint)
      topDesignation = await Designation.findOne({
        title: topDesignationTitle,
      });
      if (!topDesignation) {
        return res.status(404).json({ message: "Top designation not found" });
      }
    }
    topDesignation = topDesignation.title;
    const newDesignation = new Designation({
      title,
      remark,
      createdAt: new Date(),
      core,
      topDesignation,
    });

    await newDesignation.save();
    res.status(201).json(newDesignation);
  } catch (error) {
    console.error(error.message); // Log error for debugging
    res.status(400).json({ msg: "Error adding designation" });
  }
};

const allDesignation = async (req, res) => {
  try {
    const designations = await Designation.find();
    res.json(designations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDesignation = async (req, res) => {
  try {
    const { title, remark, core, topDesignationId } = req.body;
    const designationId = req.params.id;

    const existingDesignation = await Designation.findById(designationId);
    if (!existingDesignation) {
      return res.status(404).json({ message: "Designation not found" });
    }

    let topDesignation = null;
    if (core && topDesignationId) {
      topDesignation = await Designation.findById(topDesignationId);
      if (!topDesignation) {
        return res.status(404).json({ message: "Top designation not found" });
      }
    }

    existingDesignation.title = title;
    existingDesignation.remark = remark;
    existingDesignation.core = core;
    existingDesignation.topDesignation = topDesignation;

    await existingDesignation.save();

    res.status(200).json(existingDesignation);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const crudUpdateId = (req, res) => {
  const id = req.params.id;
  Designation.find({ _id: id }).then((Designation) =>
    res.json({ message: "updated successfully", Designation })
  );
};

const deleteDesignation = async (req, res) => {
  try {
    const item = await Designation.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "item not found" });
    }
    item.isDelete = true;
    await item.save();
    res.json({ message: "deleted" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
// code for Department schema

const addDepartment = async (req, res) => {
  try {
    const { departmentName, remark } = req.body;

    const newDepartment = new Department({
      departmentName,
      remark,
      createdAt: new Date(),
    });

    await newDepartment.save();

    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
const allDepartment = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const departmentId = req.params.id;

    const { departmentName, remark } = req.body;

    let department = await Department.findById(departmentId);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    department.departmentName = departmentName;
    department.remark = remark;

    await department.save();

    res.status(200).json(department);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const departmentUpdate = (req, res) => {
  const id = req.params.id;
  Department.find({ _id: id }).then((Department) =>
    res.json({ message: "updated successfully", Department })
  );
};

const deleteDepartment = async (req, res) => {
  try {
    const item = await Department.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "item not found" });
    }
    item.isDelete = true;
    await item.save();
    res.json({ message: "deleted" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
// code for User schemaconst bcrypt = require('bcrypt');

const addUser = async (req, res) => {
  try {
    const {
      fullName,
      gender,
      mobile,
      email,
      username,
      password,
      confirmPassword,
      responsibility,
      designation,
      core,
      remark,
      isAdmin,
    } = req.body;

    // Validate if password and confirmPassword match
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ msg: "Password and Confirm Password do not match" });
    }

    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ msg: "Username or email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      fullName,
      gender,
      mobile,
      email,
      username,
      password: hashedPassword,
      confirmPassword: hashedPassword, // ConfirmPassword should also be hashed for consistency
      // responsibility,
      // designation,
      core,
      remark,
      isAdmin,
      isDelete: false, // Assuming the user is not marked for deletion by default
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// const addUser = async (req, res) => {
//   try {
//     const {
//       fullName,
//       gender,
//       mobile,
//       email,
//       username,
//       password,
//       confirmPassword,
//       core,
//       remark,
//       designationTitle,
//       responsibilityTitle,
//       isAdmin,
//     } = req.body;

//     const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ message: "Username or email already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const designation = await Designation.findOne({ title: designationTitle });
//     const responsibility = await Responsibility.findOne({
//       title: responsibilityTitle,
//     });

//     if (!designation) {
//       return res
//         .status(400)
//         .json({ message: `Designation "${designationTitle}" not found` });
//     }
//     if (!responsibility) {
//       return res
//         .status(400)
//         .json({ message: `Responsibility "${responsibilityTitle}" not found` });
//     }

// Create a new user
//     const newUser = new User({
//       fullName,
//       gender,
//       mobile,
//       email,
//       username,
//       designation: designation.title,
//       responsibility: responsibility.title,
//       password: hashedPassword,
//       confirmPassword: hashedPassword,
//       created_at: new Date(),
//       core,
//       remark,
//     });

//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("Error registering user:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      token: token,
    };
    res
      .status(200)
      .json({ token: token, user: userData, msg: "Login Successfull" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const logoutUser = async (req, res, next) => {
  localStorage.removeItem("token");
  // res.clearCookie("token");
  res.json({ message: "successfully signout" });
};

const allUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateUser = async (req, res) => {
  try {
    const {
      fullName,
      gender,
      mobile,
      email,
      username,
      password,
      confirmPassword,
      designationId,
      core,
    } = req.body;

    // if (!fullName || !gender || !mobile || !username || !email || !designationId || core === undefined) {
    //   return res.status(400).json({
    //     message: "Missing required fields: fullName, gender, mobile, email, username, designationId, core",
    //   });
    // }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password and Confirm Password do not match",
      });
    }

    // const designation = await Designation.findById(designationId);
    // if (!designation) {
    //   return res.status(404).json({ message: "Designation not found" });
    // }

    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        gender,
        mobile,
        email,
        username,
        password,
        core,
        // designation: {
        //   _id: designation._id,
        //   title: designation.title,
        // },
        updated_at: new Date(),
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error updating user" });
  }
};
const userUpdate = (req, res) => {
  const id = req.params.id;
  User.find({ _id: id }).then((User) =>
    res.json({ message: "updated successfully", User })
  );
};
const deleteUser = async (req, res) => {
  try {
    const item = await User.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "item not found" });
    }
    item.isDelete = true;
    await item.save();
    res.json({ message: "deleted" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

// code for Permission schema
const addPermission = async (req, res) => {
  const { name, title, level, permission } = req.body;

  try {
    if (!name || !title || !level) {
      return res.status(400).json({ error: "Fields cannot be empty." });
    }

    const existingPermission = await Permission.findOne({ name });
    if (existingPermission) {
      return res
        .status(400)
        .json({ error: "Permission with this name already exists." });
    }

    const newPermission = new Permission({
      name,
      title,
      level,
    });

    await newPermission.save();

    return res.status(201).json({
      message: "Permission added successfully.",
      permission: newPermission,
    });
  } catch (error) {
    console.error("Error adding permission:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const allPermission = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addResponsibility = async (req, res) => {
  try {
    const { title, remark, permission } = req.body;

    // Check if the provided permission exists in the Permission model
    const existingPermission = await Permission.findOne({ name: permission });

    if (!existingPermission) {
      return res.status(400).json({ message: "Permission does not exist" });
    }

    // Create a new Responsibility object
    const newResponsibility = new Responsibility({
      title,
      remark,
      permission: existingPermission.name, // Save the permission name
    });

    // Save the new responsibility to the database
    const createdResponsibility = await newResponsibility.save();

    res.status(201).json(createdResponsibility); // Return the created responsibility object in the response
  } catch (error) {
    console.error("Error adding responsibility:", error);
    res.status(400).json({ message: "Error adding responsibility" });
  }
};
const allResponsibility = async (req, res) => {
  try {
    const responsibilities = await Responsibility.find();
    res.json(responsibilities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const uploadStudentFile = async function (req, res) {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const fileData = req.file.buffer;

    const file = new Student({
      filename: req.file.filename,
    });

    await file.save();

    res.send("File uploaded successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
const getAllStudentsFile = async function (req, res) {
  try {
    // Fetch all students from the database
    const students = await Student.find({});
    res.json(students);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const readUploadedFile = async function (req, res) {
  try {
    const { id } = req.params;

    const fileStore = await Student.findById(id);
    if (!fileStore) {
      return res.status(400).send("No file uploaded");
    }

    const filename = fileStore.filename;
    const filePath = `uploads/${filename}`;

    if (!fs.existsSync(filePath)) {
      return res.status(404).send("File not found");
    }

    const fileData = fs.readFileSync(filePath);
    console.log("fileData", fileData);
    const workbook = xlsx.read(fileData, { type: "buffer" });
    console.log("workbook", workbook);

    if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
      return res.status(400).send("No sheets found in the workbook");
    }
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);
    const insertedData = [];
    for (let i = 0; i < jsonData.length; i++) {
      const rowData = jsonData[i];

      const newData = {};

      Object.keys(rowData).forEach(key => {
        newData[key] = rowData[key];
      });

      newData.file = id;

      const newProcessData = new Process(newData);

      await newProcessData.save();

      insertedData.push(newProcessData);
    }

    res.json(insertedData);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getUploadedStudents = async function (req, res) {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 
    const searchQuery = req.query.search || '';
    const programFilter = req.query.program;
    const yearFilter = req.query.Date_of_Admission;

    const startIndex = (page - 1) * limit;
    let query = {};

    if (searchQuery) {
      query.Applicant_Name = { $regex: searchQuery, $options: 'i' };
    }

    if (programFilter !== undefined && programFilter !== '') {
      query.CourseLevel = programFilter; 
    }
    let admissionYear;

if (yearFilter !== undefined && yearFilter !== '') {
    admissionYear = yearFilter.split("/")[2]; 
    query.CourseLevel = programFilter; 

}
    const details = await Process.find(query).skip(startIndex).limit(limit);
    const distinctPrograms = await Process.distinct('CourseLevel');
    const totalCount = await Process.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      currentPage: page,
      totalPages: totalPages,
      data: details,
      programs: distinctPrograms 
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}
// const getUploadedStudents = async function (req, res) {
//   try {
//     const page = parseInt(req.query.page) || 1; 
//     const limit = parseInt(req.query.limit) || 10; 
//     const searchQuery = req.query.search || '';
//     const programFilter = req.query.program;
//     const yearFilter = req.query.Date_of_Admission;

//     const startIndex = (page - 1) * limit;
//     let query = {};

//     if (searchQuery) {
//       query.Applicant_Name = { $regex: searchQuery, $options: 'i' };
//     }

//     if (programFilter !== undefined && programFilter !== '') {
//       query.CourseLevel = programFilter; 
//     }

//     if (yearFilter !== undefined && yearFilter !== '') {
//       // Extracting year from Date_of_Admission
//       const admissionYear = yearFilter.split("/")[2]; 
//       // Filtering by admission year
//       query.Date_of_Admission = { $regex: `^${admissionYear}` };
//     }

//     const details = await Process.find(query).skip(startIndex).limit(limit);
//     const distinctPrograms = await Process.distinct('CourseLevel');
//     const totalCount = await Process.countDocuments();
//     const totalPages = Math.ceil(totalCount / limit);

//     res.json({
//       currentPage: page,
//       totalPages: totalPages,
//       data: details,
//       programs: distinctPrograms,
//        admissionYear: admissionYear
//     });
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// }
               
const EnrollmentByStudent = async (req, res) => {
  try {
      const formData = req.body;
      const newStudent = new FillEnrollmentModel(formData);
      await newStudent.save();
      res.status(200).send('Student saved successfully');
  } catch (error) {
      console.error(error);
      res.status(500).send('Error saving student');
  }
}
const EnrollmentByStudentRead = async (req, res) => {
  try {
      const studentId = req.params.id; 
      const student = await FillEnrollmentModel.findById(studentId);
      
      if (!student) {
          return res.status(404).send('Student not found');
      }
      
      res.status(200).send(student); 
  } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching student');
  }
}
async function EnrollmentStudentsDoc(details) {
  try {
      // Create a new document instance
      const newStudentDoc = new StudentDoc({
          id: details.id,
          highRollno: details.highRollno,
          upload_highMarksheet: details.upload_highMarksheet,
          upload_higherMarksheet: details.upload_higherMarksheet,
          upload_entranceMarksheet: details.upload_entranceMarksheet,
          upload_tc: details.upload_tc,
          upload_migration: details.upload_migration,
          upload_character: details.upload_character,
          upload_domicile: details.upload_domicile,
          upload_gap: details.upload_gap,
          upload_photograph: details.upload_photograph,
          upload_digital: details.upload_digital
      });

      // Save the document to the database
      const savedDoc = await newStudentDoc.save();

      // Return the saved document
      return savedDoc;
  } catch (error) {
      console.error("Error saving student documents:", error);
      throw error; // You can handle this error as per your application's logic
  }
}


function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
module.exports = {
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
  allResponsibility,
  uploadStudentFile,
  getAllStudentsFile,
  readUploadedFile,
  getUploadedStudents,EnrollmentByStudent,EnrollmentByStudentRead,
  EnrollmentStudentsDoc
};
