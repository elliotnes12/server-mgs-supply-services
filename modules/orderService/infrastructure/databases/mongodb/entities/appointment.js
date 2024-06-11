import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  employees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  }],
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  photos: [{
    type: String 
  }],
  comments: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  location: {
    type: {
      type: String,
      enum: ['manual', 'google'],
      required: true
    },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      country: { type: String, default: 'USA' }
    },
    google: {
      latitude: { type: Number },
      longitude: { type: Number }
    }
  },
  category: {
    type: String,
    enum: ['cleaning'],
    required: true
  }
});


export const Appointment = mongoose.model('Appointment', appointmentSchema);
