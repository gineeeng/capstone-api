const express = require("express");
const authenticateToken = require("../middlewares/AuthenticateToken");
const {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  getOneUser,
  deleteAllUser,
  getReport,
  getCrime,
  getCrimeUnsolved,
  getCrimeSolved,
  getAccident,
  getAccidentUnsolved,
  getAccidentSolved,
  updateUserStatus,
} = require("../controllers/UserController");

const router = express.Router();

router.route("/").post(createUser);

router.route("/:id").put(updateUser).get(getOneUser);

router.route("/:id/reports").get(getReport);
router.route("/:id/crime").get(getCrime);
router.route("/:id/crime/solved").get(getCrimeSolved);
router.route("/:id/crime/unsolved").get(getCrimeUnsolved);
router.route("/:id/accident").get(getAccident);
router.route("/:id/accident/solved").get(getAccidentSolved);
router.route("/:id/accident/unsolved").get(getAccidentUnsolved);

router.use(authenticateToken);

router.route("/").get(getAllUser);
router.route("/:id").delete(deleteUser);
router.route("/:id/status").put(updateUserStatus);
router.route("/delete/all").delete(deleteAllUser);

module.exports = router;
