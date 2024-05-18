const asyncHandler = require("express-async-handler");
const Report = require("../models/ReportModel");

const getAllReport = asyncHandler(async (req, res) => {
  const reportRecords = await Report.find().populate("userId");
  res.status(200).json(reportRecords);
});

const getAllAccident = asyncHandler(async (req, res) => {
  const reportRecords = await Report.find({ reportType: "Accident" }).populate(
    "userId"
  );
  res.status(200).json(reportRecords);
});

const getAllCrime = asyncHandler(async (req, res) => {
  const reportRecords = await Report.find({ reportType: "Crime" }).populate(
    "userId"
  );
  res.status(200).json(reportRecords);
});

const getAllHazard = asyncHandler(async (req, res) => {
  const reportRecords = await Report.find({ reportType: "Hazards" }).populate(
    "userId"
  );
  res.status(200).json(reportRecords);
});

const getAllArson = asyncHandler(async (req, res) => {
  const reportRecords = await Report.find({
    reportType: "Arson/Fire",
  }).populate("userId");
  res.status(200).json(reportRecords);
});

const getOneReport = asyncHandler(async (req, res) => {
  const reportRecord = await Report.findById(req.params.id).populate("userId");

  if (!reportRecord) {
    res.status(404).json({ error: "Report not found" });
    return;
  }

  res.status(200).json(reportRecord);
});

const getSolvedReports = asyncHandler(async (req, res) => {
  const solvedReports = await Report.find({ action_status: "Solved" }).populate(
    "userId"
  );
  res.status(200).json(solvedReports);
});

const getUnsolvedReports = asyncHandler(async (req, res) => {
  const unsolvedReports = await Report.find({
    action_status: { $in: ["Under Investigation", "Pending"] },
  }).populate("userId");
  res.status(200).json(unsolvedReports);
});
const getUnsolvedCrimeReports = asyncHandler(async (req, res) => {
  const unsolvedReports = await Report.find({
    reportType: "Crime",
    action_status: { $in: ["Under Investigation", "Pending"] },
  }).populate("userId");
  res.status(200).json(unsolvedReports);
});

const getSolvedCrimeReports = asyncHandler(async (req, res) => {
  const solvedReports = await Report.find({
    reportType: "Crime",
    action_status: "Solved",
  }).populate("userId");
  res.status(200).json(solvedReports);
});

const getUnsolvedAccidentReports = asyncHandler(async (req, res) => {
  const unsolvedReports = await Report.find({
    reportType: "Accident",
    action_status: { $in: ["Under Investigation", "Pending"] },
  }).populate("userId");
  res.status(200).json(unsolvedReports);
});

const getSolvedAccidentReports = asyncHandler(async (req, res) => {
  const solvedReports = await Report.find({
    reportType: "Accident",
    action_status: "Solved",
  }).populate("userId");
  res.status(200).json(solvedReports);
});

const getSolvedHazardReports = asyncHandler(async (req, res) => {
  const solvedReports = await Report.find({
    reportType: "Hazards",
    action_status: "Solved",
  }).populate("userId");
  res.status(200).json(solvedReports);
});

const getUnsolvedHazardReports = asyncHandler(async (req, res) => {
  const unsolvedReports = await Report.find({
    reportType: "Hazards",
    action_status: { $in: ["Under Investigation", "Pending"] },
  }).populate("userId");
  res.status(200).json(unsolvedReports);
});

const getSolvedArsonReports = asyncHandler(async (req, res) => {
  const solvedReports = await Report.find({
    reportType: "Arson/Fire",
    action_status: "Solved",
  }).populate("userId");
  res.status(200).json(solvedReports);
});

const getUnsolvedArsonReports = asyncHandler(async (req, res) => {
  const unsolvedReports = await Report.find({
    reportType: "Arson/Fire",
    action_status: "Under Investigation",
  }).populate("userId");
  res.status(200).json(unsolvedReports);
});

const createReport = asyncHandler(async (req, res) => {
  const {
    reportType,
    type,
    murderType,
    photoURL,
    videoURL,
    date,
    location,
    description,
    numberOfCasualties,
    numberOfInjuries,
    injurySeverity,
    action_status,
    userId,
  } = req.body;

  if (
    !reportType ||
    !type ||
    !date ||
    !location ||
    !description ||
    !userId ||
    !injurySeverity
  ) {
    res.status(400).json({ error: "Please provide all required fields" });
    return;
  }

  const reportRecordExist = await Report.findOne({
    reportType,
    type,
    description,
    date,
    location,
    userId,
  });

  if (reportRecordExist) {
    res.status(400).json({ error: "Report already exists" });
    return;
  }

  const reportRecord = await Report.create({
    reportType,
    type,
    murderType,
    photoURL,
    videoURL,
    date,
    location,
    description,
    numberOfCasualties,
    numberOfInjuries,
    injurySeverity,
    action_status,
    userId,
  });

  res.status(201).json(reportRecord);
});

const updateReport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const reportRecord = await Report.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!reportRecord) {
    res.status(404).json({ error: "Report not found" });
    return;
  }

  res.status(200).json(reportRecord);
});

const deleteReport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const reportRecord = await Report.findByIdAndDelete(id);

  if (!reportRecord) {
    res.status(404).json({ error: "Report not found" });
    return;
  }
  res.status(200).json({ message: "Report deleted successfully" });
});

const deleteAllReport = asyncHandler(async (req, res) => {
  await Report.deleteMany();
  res.status(200).json({ message: "All reports deleted successfully" });
});

module.exports = {
  getAllReport,
  getAllAccident,
  getAllCrime,
  getAllArson,
  getAllHazard,
  getOneReport,
  getSolvedReports,
  getUnsolvedReports,
  getSolvedAccidentReports,
  getUnsolvedAccidentReports,
  getSolvedArsonReports,
  getUnsolvedArsonReports,
  getSolvedCrimeReports,
  getUnsolvedCrimeReports,
  getSolvedHazardReports,
  getUnsolvedHazardReports,
  createReport,
  updateReport,
  deleteReport,
  deleteAllReport,
};
