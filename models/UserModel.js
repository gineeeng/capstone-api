const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "Please add an id"],
      trim: true,
      unique: true,
    },
    profilePic: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Please add your Name"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please add your Email"],
    },
    birthday: {
      type: Date,
      trim: true,
      required: [true, "Please add your Birthday"],
    },
    sex: {
      type: String,
      trim: true,
      enum: ["Male", "Female", "Others"],
      required: [true, "Please add your Sex"],
    },
    address: {
      street: { type: String, trim: true },
      houseNumber: { type: Number, trim: true },
      barangay: {
        type: String,
        required: [true, "Please add your barangay"],
        trim: true,
      },
      municipality: {
        type: String,
        default: "Dagupan City",
        required: [true, "Please add your Municipality"],
        trim: true,
      },
      province: {
        type: String,
        trim: true,
        default: "Pangasinan",
        required: [true, "Please add a province"],
      },
      country: {
        type: String,
        default: "Philippines",
        required: [true, "Please add your country"],
        trim: true,
      },
    },
    contact_no: {
      type: String,
      trim: true,
      required: [true, "Please add your Contact Number"],
    },
    status: {
      type: String,
      trim: true,
      enum: ["active", "disabled"],
      default: "active",
      required: [true, "Please add a Status"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
