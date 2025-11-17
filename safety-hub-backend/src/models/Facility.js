import mongoose from "mongoose";

const facilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['school', 'hospital', 'office', 'residential', 'industrial', 'public'], required: true },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: { type: String, default: 'India' }
  },
  contactPerson: {
    name: String,
    phone: String,
    email: String
  },
  capacity: { type: Number, required: true },
  safetyFeatures: [{
    name: String,
    status: { type: String, enum: ['active', 'maintenance', 'inactive'], default: 'active' },
    lastInspection: Date
  }],
  emergencyEquipment: [{
    type: String,
    quantity: Number,
    condition: { type: String, enum: ['good', 'fair', 'poor'], default: 'good' }
  }],
  complianceStatus: { type: String, enum: ['compliant', 'pending', 'non-compliant'], default: 'pending' },
  lastInspectionDate: Date,
  nextInspectionDate: Date,
  assignedStaff: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Facility", facilitySchema);
