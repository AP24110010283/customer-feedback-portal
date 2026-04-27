import FeatureRequest from "../models/FeatureRequest.js";

// Update Feature Status
export const updateFeatureStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const feature = await FeatureRequest.findById(req.params.id);

    if (!feature) {
      return res.status(404).json({
        message: "Feature not found",
      });
    }

    feature.status = status;

    const updatedFeature = await feature.save();

    res.json(updatedFeature);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};