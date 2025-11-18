import Alert from "../models/Alert.js";

export const createAlert = async (req, res) => {
  try {
    const { title, message, type, location } = req.body;
    
    if (!title || !message) {
      return res.status(400).json({ msg: "Title and message are required" });
    }
    
    const alert = await Alert.create({
      title,
      message,
      type: type || "info",
      location,
      createdBy: req.user
    });
    
    res.status(201).json(alert);
  } catch (error) {
    console.error("Create alert error:", error);
    res.status(500).json({ msg: "Failed to create alert" });
  }
};

export const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error) {
    console.error("Get alerts error:", error);
    res.status(500).json({ msg: "Failed to fetch alerts" });
  }
};