const asyncHandler = require("express-async-handler");
const Admin = require("../models/AdminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getAllAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.find({ Admin });
  res.status(200).json(admin);
});

const getOneAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id);

  if (!admin) {
    res.status(400);
    throw new Error("User not found");
  }

  res.status(200).json(admin);
});

const loginAdmin = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error({ error: "Please add all fields" });
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(401).json({ error: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Wrong Password" });
  }

  const token = jwt.sign({ userId: admin._id }, process.env.SECRET_LOGIN_KEY, {
    expiresIn: "7d",
  });
  res
    .status(200)
    .json({
      success: true,
      message: "Login successful",
      token,
      adminId: admin._id,
      role: admin.role,
    });
});

const createAdmin = asyncHandler(async (req, res) => {
  const { name, role, email, password } = req.body;

  if (!name && !role) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExist = await Admin.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    name,
    role,
    email,
    password: hashedPassword,
  });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      role: admin.role,
      email: admin.email,
      password: admin.hashedPassword,
    });
  } else {
    res.status(400);
    throw new Error("Cant register");
  }
});

const updateAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id);

  if (!admin) {
    res.status(400);
    throw new Error("User no found");
  }

  const updatedUser = await Admin.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedUser);
});

const editAdminPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const admin = await Admin.findById(req.params.id);

  if (!admin) {
    res.status(400);
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(oldPassword, admin.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid current password" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  admin.password = hashedPassword;

  await admin.save();

  res.json({ message: "Password changed successfully" });
});

const deleteAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id);

  if (!admin) {
    res.status(400);
    throw new Error("User no found");
  }

  await admin.deleteOne();

  res.status(200).json({ id: req.params.id });
});

const deleteAllAdmin = asyncHandler(async (req, res) => {
  await Admin.deleteMany();
  res.status(200).json({ message: "delete all" });
});

module.exports = {
  getAllAdmin,
  getOneAdmin,
  createAdmin,
  updateAdmin,
  editAdminPassword,
  deleteAdmin,
  deleteAllAdmin,
  loginAdmin,
};
