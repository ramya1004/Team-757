import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: 'Patient',
      required: false,
    },
    docId: {
      type: String,
      ref: 'Doctor',
      required: false ,
    },

    symptoms: {
      type: [String],
      required: false ,
    },
    duration: {
      type: String,
      required: false ,
    },
    painLevel: {
      type: Number,
      min: 1,
      max: 10,
    },
    bodyTemperature: {
      type: Number,
    },
    bloodPressure: {
      type: String,
    },
    existingConditions: {
      type: [String],
    },
    medications: {
      type: [String],
    },
    additionalNotes: {
      type: String,
    },

    appointmentDate: {
      type: Date,
      required: false ,
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected', 'Completed'],
      default: 'Pending',
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: false }
);

const ReportData = mongoose.model('report', reportSchema);
export default ReportData;
