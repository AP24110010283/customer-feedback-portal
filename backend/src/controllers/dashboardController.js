import FeatureRequest from "../models/FeatureRequest.js";
import Feedback from "../models/Feedback.js";

// User Dashboard
export const userDashboard = async (req, res) => {
  try {
    const features = await FeatureRequest.find({
      user: req.user._id,
    });

    const feedback = await Feedback.find({
      user: req.user._id,
    });

    const votes = await FeatureRequest.find({
      votes: req.user._id,
    });

    res.json({
      features,
      feedback,
      votes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Admin Dashboard
export const adminDashboard = async (req, res) => {
  try {
    const totalFeatures = await FeatureRequest.countDocuments();
    const totalFeedback = await Feedback.countDocuments();

    const features = await FeatureRequest.find();
    
    // Simple logic: totalVotes = sum of feature.votes.length across all features
    const totalVotes = features.reduce((sum, feature) => sum + (feature.votes ? feature.votes.length : 0), 0);

    // Sort features by votes length for the dashboard (descending)
    features.sort((a, b) => (b.votes ? b.votes.length : 0) - (a.votes ? a.votes.length : 0));

    res.json({
      totalFeatures,
      totalFeedback,
      totalVotes,
      features,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};