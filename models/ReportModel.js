const mongoose = require("mongoose");

const reportSchema = mongoose.Schema(
  {
    reportType: {
      type: String,
      trim: true,
      enum: ["Crime", "Accident", "Hazards", "Arson/Fire"],
      required: [true, "Please add a Value"],
    },
    type: {
      type: String,
      trim: true,
      required: [true, "Please add a Value"],
    },
    murderType: {
      type: String,
      trim: true,
    },
    photoURL: {
      type: [String],
      trim: true,
    },
    videoURL: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      trim: true,
      required: [true, "Please add a Value"],
    },
    location: {
      street: { type: String, trim: true },
      barangay: {
        type: String,
        required: [true, "Please add a barangay"],
        trim: true,
      },
      municipality: {
        type: String,
        trim: true,
        required: [true, "Please add a municipality"],
      },
      province: {
        type: String,
        trim: true,
        default: "Pangasinan",
        required: [true, "Please add a province"],
      },
      country: {
        type: String,
        trim: true,
        default: "Philippines",
        required: [true, "Please add a country"],
      },
    },
    numberOfCasualties: {
      type: Number,
      trim: true,
    },
    numberOfInjuries: {
      type: Number,
      trim: true,
    },
    injurySeverity: {
      type: String,
      trim: true,
      enum: ["Minor", "Moderate", "Major", "Severe"],
      required: [true, "Please add a Value"],
    },
    action_status: {
      type: String,
      trim: true,
      enum: ["Under Investigation", "Solved",  "Case Closed", "Archive"],
      default: "Under Investigation",
    },
    userId: {
      type: String,
      trim: true,
      required: [true, "Please add a Value"],
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Report", reportSchema);
