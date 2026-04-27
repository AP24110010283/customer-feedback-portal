import mongoose from "mongoose";

const featureRequestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    votes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],

    status: {
      type: String,
      enum: ["pending", "reviewed", "implemented"],
      default: "pending",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const FeatureRequest = mongoose.model("FeatureRequest", featureRequestSchema);

export default FeatureRequest;