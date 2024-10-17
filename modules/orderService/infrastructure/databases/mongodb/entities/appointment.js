import mongoose from "mongoose";
import moment from "moment";

const counterSchema = new mongoose.Schema({
  seq: { type: Number, default: 0 }
});
const Counter = mongoose.model('Counter', counterSchema);

const appointmentSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['cleaning', 'painting'],
    required: true
  },
  from: {
    type: String,
    required: true
  },
  until: {
    type: String,
    required: true
  },
  hour: {
    type: String,
    required: true
  },
  employees: [{
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  }],
  address: { type: String, required: true },
  location: {
    latitude: { type: Number },
    longitude: { type: Number }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Customer'
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Employee'
  },
  photos: [{
    type: String
  }],
  comments: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'cancelled'],
    default: 'in_progress'
  },
  ticket: {
    type: String,
    unique: true
  }
}, { timestamps: true });

appointmentSchema.pre('save', async function (next) {
  const appointment = this;

  if (!appointment.ticket) {
    try {
      const counter = await Counter.findOneAndUpdate(
        {},
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      const year = moment().format('YYYY');
      appointment.ticket = `SERV-${counter.seq}-${year}`;

      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

appointmentSchema.virtual("formattedDate").get(function () {
  if (!this.from || !moment(this.from, "YYYY-MM-DD").isValid()) {
    return "";
  }
  return moment(this.from, "YYYY-MM-DD").format("DD/MM/YYYY");
});

appointmentSchema.virtual("formattedTime").get(function () {
  if (!this.hour || !moment(this.hour, "HH:mm").isValid()) {
    return "";
  }
  return moment(this.hour, "HH:mm A");
});

appointmentSchema.virtual("formattedFrom").get(function () {
  if (!this.from || !moment(this.from, "YYYY-MM-DD").isValid()) {
    return "";
  }
  return moment(this.from).format("MMMM D, YYYY");
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
