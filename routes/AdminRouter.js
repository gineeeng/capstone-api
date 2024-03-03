const express = require("express");
const authenticateToken = require("../middlewares/AuthenticateToken");
const {
  createAdmin,
  loginAdmin,
  updateAdmin,
  deleteAdmin,
  getOneAdmin,
  getAllAdmin,
  deleteAllAdmin,
  editAdminPassword,
} = require("../controllers/AdminController");
const router = express.Router();

router.route("/").post(createAdmin);

router.route("/login").post(loginAdmin);

router.use(authenticateToken);

router.route("/").get(getAllAdmin);

router.route("/:id").put(updateAdmin).delete(deleteAdmin).get(getOneAdmin);

router.route("/delete/all").delete(deleteAllAdmin);

router.route("/edit-password/:id").put(editAdminPassword);

module.exports = router;
