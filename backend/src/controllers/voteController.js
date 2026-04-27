import FeatureRequest from "../models/FeatureRequest.js";

// Upvote Feature
export const upvoteFeature = async (req, res) => {
  try {
    const featureId = req.params.id;
    const userId = req.user._id;

    const feature = await FeatureRequest.findById(featureId);

    if (!feature) {
      return res.status(404).json({
        message: "Feature not found",
      });
    }

    feature.votes = feature.votes || [];

    const hasVoted = feature.votes.some(
      (id) => id.toString() === userId.toString()
    );

    if (hasVoted) {
      // Remove vote
      feature.votes = feature.votes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      // Add vote
      feature.votes.push(userId);
    }

    await feature.save();

    res.json(feature);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};