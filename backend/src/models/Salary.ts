import mongoose, { Schema } from 'mongoose';

const SalarySchema = new Schema({
  company: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  level: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  base: { type: Number, required: true },
  bonus: { type: Number, required: true },
  stock: { type: Number, required: true },
  totalComp: { type: Number, required: true },
  yearsOfExperience: { type: Number, required: true },
  submittedBy: { type: String },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Salary', SalarySchema);