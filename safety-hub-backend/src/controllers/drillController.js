import Drill from "../models/Drill.js";

export const getAllDrills = async (req, res) => {
  try {
    const drills = await Drill.find()
      .populate('facility', 'name type address')
      .populate('coordinator', 'name email')
      .sort({ scheduledDate: -1 });
    res.json(drills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDrillById = async (req, res) => {
  try {
    const drill = await Drill.findById(req.params.id)
      .populate('facility')
      .populate('coordinator', 'name email')
      .populate('participants.user', 'name email');
    if (!drill) return res.status(404).json({ message: "Drill not found" });
    res.json(drill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDrill = async (req, res) => {
  try {
    const drill = await Drill.create(req.body);
    res.status(201).json(drill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateDrill = async (req, res) => {
  try {
    const drill = await Drill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!drill) return res.status(404).json({ message: "Drill not found" });
    res.json(drill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUpcomingDrills = async (req, res) => {
  try {
    const drills = await Drill.find({
      status: 'scheduled',
      scheduledDate: { $gte: new Date() }
    })
      .populate('facility', 'name type')
      .populate('coordinator', 'name')
      .sort({ scheduledDate: 1 })
      .limit(10);
    res.json(drills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const completeDrill = async (req, res) => {
  try {
    const drill = await Drill.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'completed',
        completedDate: new Date(),
        results: req.body.results
      },
      { new: true }
    );
    if (!drill) return res.status(404).json({ message: "Drill not found" });
    res.json(drill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
