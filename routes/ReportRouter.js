const express = require("express");
const authenticateToken = require("../middlewares/AuthenticateToken");
const {
  getAllReport,
  getAllAccident,
  getAllCrime,
  getAllHazard,
  getAllArson,
  getSolvedReports,
  getUnsolvedReports,
  getSolvedAccidentReports,
  getUnsolvedAccidentReports,
  createReport,
  updateReport,
  deleteReport,
  getOneReport,
  deleteAllReport,
  getSolvedCrimeReports,
  getUnsolvedCrimeReports,
  getSolvedArsonReports,
  getUnsolvedArsonReports,
  getSolvedHazardReports,
  getUnsolvedHazardReports,
} = require("../controllers/ReportController");

const router = express.Router();

router.route("/").post(createReport).get(getAllReport).delete(deleteAllReport);

router.route("/accidents").get(getAllAccident);
router.route("/crimes").get(getAllCrime);
router.route("/arsons").get(getAllArson);
router.route("/hazards").get(getAllHazard);

router.use(authenticateToken);

router.route("/solved").get(getSolvedReports);
router.route("/unsolved").get(getUnsolvedReports);
router.route("/accidents/solved").get(getSolvedAccidentReports);
router.route("/accidents/unsolved").get(getUnsolvedAccidentReports);
router.route("/crimes/solved").get(getSolvedCrimeReports);
router.route("/crimes/unsolved").get(getUnsolvedCrimeReports);
router.route("/arsons/solved").get(getSolvedArsonReports);
router.route("/arsons/unsolved").get(getUnsolvedArsonReports);
router.route("/hazards/solved").get(getSolvedHazardReports);
router.route("/hazards/unsolved").get(getUnsolvedHazardReports);

router.route("/:id").get(getOneReport).put(updateReport).delete(deleteReport);

module.exports = router;
