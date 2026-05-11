const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      // CUSTOMIZE: Must exactly match the categories array in
      // Skills.jsx and AdminSkills.jsx.
      // Skills added with a category not in this list will be rejected by MongoDB.
      enum: [
        "CATEGORY_1",
        "CATEGORY_2",
        "CATEGORY_3",
        "CATEGORY_4",
        "CATEGORY_5",
        "CATEGORY_6",
      ],
      required: true,
    },
    visible: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Skill", skillSchema);
