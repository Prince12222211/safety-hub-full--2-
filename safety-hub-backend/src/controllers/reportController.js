import Report from "../models/Report.js";

export const createReport = async (req, res) => {
  try {
    const { title, location, description, type, priority } = req.body;
    
    if (!title || !location || !description) {
      return res.status(400).json({ msg: "Title, location, and description are required" });
    }
    
    const report = await Report.create({
      title,
      location,
      description,
      type: type || "incident",
      priority: priority || "medium",
      user: req.user
    });
    
    res.status(201).json(report);
  } catch (error) {
    console.error("Create report error:", error);
    res.status(500).json({ msg: "Failed to create report" });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    console.error("Get reports error:", error);
    res.status(500).json({ msg: "Failed to fetch reports" });
  }
};