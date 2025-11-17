import Module from "../models/Module.js";

export const getAllModules = async (req, res) => {
  try {
    const modules = await Module.find({ isActive: true }).select('-content');
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getModuleById = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) return res.status(404).json({ message: "Module not found" });
    res.json(module);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createModule = async (req, res) => {
  try {
    const module = await Module.create(req.body);
    res.status(201).json(module);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const enrollModule = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) return res.status(404).json({ message: "Module not found" });
    
    if (!module.enrolledUsers.includes(req.user.id)) {
      module.enrolledUsers.push(req.user.id);
      await module.save();
    }
    res.json({ message: "Enrolled successfully", module });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const completeModule = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) return res.status(404).json({ message: "Module not found" });
    
    if (!module.completedUsers.includes(req.user.id)) {
      module.completedUsers.push(req.user.id);
      await module.save();
    }
    res.json({ message: "Module completed successfully", module });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyModules = async (req, res) => {
  try {
    const modules = await Module.find({ 
      enrolledUsers: req.user.id 
    }).select('-content');
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
