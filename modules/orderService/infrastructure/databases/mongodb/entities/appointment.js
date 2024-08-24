import mongoose from "mongoose";
import moment from "moment"; 

const appointmentSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  hour: {
    type: String,
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

appointmentSchema.virtual("formattedDate").get(function () {
  if (!this.date || !moment(this.date, "YYYY-MM-DD").isValid()) {
    return "";
  }
  return moment(this.date, "YYYY-MM-DD").format("DD/MM/YYYY");
});

appointmentSchema.virtual("formattedTime").get(function () {
  if (!this.hour || !moment(this.hour, "HH:mm").isValid()) {
    return "";
  }
  return moment(this.hour, "HH:mm").format("HH:mm A");
});

appointmentSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    ret.formattedDate = ret.formattedDate;
    ret.formattedTime = ret.formattedTime;
    delete ret._id;
    return ret;
  }
});

export const Appointment = mongoose.model('Appointment', appointmentSchema);
