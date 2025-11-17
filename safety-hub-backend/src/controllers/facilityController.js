import Facility from "../models/Facility.js";

export const getAllFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find({ isActive: true })
      .populate('assignedStaff', 'name email');
    res.json(facilities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFacilityById = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id)
      .populate('assignedStaff', 'name email');
    if (!facility) return res.status(404).json({ message: "Facility not found" });
    res.json(facility);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFacility = async (req, res) => {
  try {
    const facility = await Facility.create(req.body);
    res.status(201).json(facility);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateFacility = async (req, res) => {
  try {
    const facility = await Facility.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!facility) return res.status(404).json({ message: "Facility not found" });
    res.json(facility);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteFacility = async (req, res) => {
  try {
    const facility = await Facility.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!facility) return res.status(404).json({ message: "Facility not found" });
    res.json({ message: "Facility deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
