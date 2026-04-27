import Feedback from "../models/Feedback.js";

// Create Feedback
export const createFeedback = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const feedback = await Feedback.create({
      title,
      description,
      category,
      user: req.user._id,
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get All Feedback
export const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.json(feedback);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Update Feedback
export const updateFeedback = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    // Verify ownership ONLY (admin CANNOT update)
    if (!feedback.user || feedback.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this feedback" });
    }

    feedback.title = title || feedback.title;
    feedback.description = description || feedback.description;
    feedback.category = category || feedback.category;

    const updatedFeedback = await feedback.save();
    res.json(updatedFeedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Feedback
export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    // Verify ownership ONLY (admin CANNOT delete)
    if (!feedback.user || feedback.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this feedback" });
    }

    await feedback.deleteOne();
    res.json({ message: "Feedback removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};