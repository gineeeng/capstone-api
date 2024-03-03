const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const Report = require("../models/ReportModel");

const getAllUser = asyncHandler(async (req, res) => {
  const user = await User.find({ User });
  res.status(200).json(user);
});

const getOneUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  res.status(200).json(user);
});

const getReport = asyncHandler(async (req, res) => {
  const reportRecord = await Report.find({ userId: req.params.id }).populate(
    "userId"
  );
  res.status(200).json(reportRecord);
});

const getCrime = asyncHandler(async (req, res) => {
  const crimeRecord = await Report.find({
    reportType: "Crime",
    userId: req.params.id,
  }).populate("userId");
  res.status(200).json(crimeRecord);
});

const getCrimeSolved = asyncHandler(async (req, res) => {
  const solvedCrime = await Report.find({
    reportType: "Crime",
    userId: req.params.id,
    action_status: "Solved",
  }).populate("userId");
  res.status(200).json(solvedCrime);
});

const getCrimeUnsolved = asyncHandler(async (req, res) => {
  const unsolvedCrime = await Report.find({
    reportType: "Crime",
    userId: req.params.id,
    action_status: { $in: ["Pending", "InProgress"] },
  }).populate("userId");
  res.status(200).json(unsolvedCrime);
});

const getCrimeOngoing = asyncHandler(async (req, res) => {
  const ongoingCrime = await Report.find({
    reportType: "Crime",
    userId: req.params.id,
    action_status: "InProgress",
  }).populate("userId");
  res.status(200).json(ongoingCrime);
});

const getAccident = asyncHandler(async (req, res) => {
  const accidentRecord = await Report.find({
    reportType: "Accident",
    userId: req.params.id,
  }).populate("userId");
  res.status(200).json(accidentRecord);
});

const getAccidentSolved = asyncHandler(async (req, res) => {
  const solvedAccident = await Report.find({
    reportType: "Accident",
    userId: req.params.id,
    action_status: "Solved",
  }).populate("userId");
  res.status(200).json(solvedAccident);
});

const getAccidentUnsolved = asyncHandler(async (req, res) => {
  const unsolvedAccident = await Report.find({
    reportType: "Accident",
    userId: req.params.id,
    action_status: { $in: ["Pending", "InProgress"] },
  }).populate("userId");
  res.status(200).json(unsolvedAccident);
});

const createUser = asyncHandler(async (req, res) => {
  const { id, name, birthday, sex, address, contact_no, email } = req.body;

  if (!name && !email) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("Email already in use");
  }

  const user = await User.create({
    _id: id,
    name,
    birthday,
    sex,
    address,
    contact_no,
    email,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      birthday: user.birthday,
      sex: user.sex,
      address: user.address,
      contact_no: user.contact_no,
    });
  } else {
    res.status(400);
    throw new Error("Cant register");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User no found");
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedUser);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User no found");
  }

  await user.deleteOne();

  res.status(200).json({ id: req.params.id });
});

const deleteAllUser = asyncHandler(async (req, res) => {
  await User.deleteMany();

  res.status(200).json({ message: "Delete All User" });
});

const updateUserStatus = asyncHandler(async (req, res) => {
  try {
    const userRecord = await User.findById(req.params.id);

    if (!userRecord) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    userRecord.action_status = req.body.actionStatus;

    await userRecord.save();

    res.status(200).json(userRecord);
  } catch (error) {
    res.status(500).json({ error: "Failed to update action status" });
  }
});

module.exports = {
  getAllUser,
  getOneUser,
  getReport,
  getCrime,
  getCrimeUnsolved,
  getCrimeSolved,
  getCrimeOngoing,
  getAccident,
  getAccidentSolved,
  getAccidentUnsolved,
  createUser,
  updateUser,
  deleteUser,
  deleteAllUser,
  updateUserStatus,
};
