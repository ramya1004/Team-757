import mongoose from "mongoose";

const PdfDetailsSchema = new mongoose.Schema(
  {
    pdf: String,
    title: String,
    userId:String
  },
  { collection: "PdfDetails" }
);

const PdfDetails = mongoose.model("PdfDetails", PdfDetailsSchema);

export default PdfDetails;
