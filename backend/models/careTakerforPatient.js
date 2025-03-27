import mongoose from "mongoose";

const careSchema = new mongoose.Schema({
  userData: { type: Object },
  docData: { type: Object },
  cId: {
    type: String
  }
,
docId: {
  type: String
},
userId: {
  type: String
}
}, {
  timestamps: true
});

const careTakerWithPatient = mongoose.model("careTakerWithPatient", careSchema);
export default careTakerWithPatient; 
