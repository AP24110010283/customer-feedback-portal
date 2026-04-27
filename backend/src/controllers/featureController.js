import FeatureRequest from "../models/FeatureRequest.js";

// Create Feature Request
export const createFeature = async (req, res) => {
  try {
    const { title, description } = req.body;

    const feature = await FeatureRequest.create({
      title,
      description,
      user: req.user._id,
    });

    res.status(201).json(feature);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get All Features
export const getFeatures = async (req, res) => {
  try {
    const features = await FeatureRequest.find()
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.json(features);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Update Feature
export const updateFeature = async (req, res) => {
  try {
    const { title, description } = req.body;
    const feature = await FeatureRequest.findById(req.params.id);

    if (!feature) {
      return res.status(404).json({ message: "Feature not found" });
    }

    // Verify ownership
    if (!feature.user || feature.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this feature" });
    }

    feature.title = title || feature.title;
    feature.description = description || feature.description;

    const updatedFeature = await feature.save();
    res.json(updatedFeature);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Feature
export const deleteFeature = async (req, res) => {
  try {
    const feature = await FeatureRequest.findById(req.params.id);

    if (!feature) {
      return res.status(404).json({ message: "Feature not found" });
    }

    // Verify ownership or admin role
    if ((!feature.user || feature.user.toString() !== req.user.id) && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this feature" });
    }

    await feature.deleteOne();
    res.json({ message: "Feature removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};