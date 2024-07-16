import mongoose, { Schema } from "mongoose";

const dstSchema = new mongoose.Schema({
    companyName: {
      type: String,
      required: true,
      ref: "Supplier"  
    },
    supplierid: {
        type: Schema.Types.ObjectId,
        ref: "Supplier",
        required: true
    },
    status: {
        type: String,
        enum: [ 'Pending', 'Approved', 'Rejected'], default: "Pending",
    },
    approvedBy: {
        type: String,
        required: null
    }
}, { timestamps: true })

const DST = mongoose.model("DST", dstSchema);

export default DST