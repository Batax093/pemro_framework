import mongoose, { Schema, mongo } from "mongoose";

const dstSchema = new mongoose.Schema({
    supplierid: {
        type: Schema.Types.ObjectId,
        ref: "Supplier",
        required: true
    },
    status: {
        type: String,
        enum: [ 'pending', 'approved', 'rejected'], default: pending,
    },
    approvedBy: {
        Date
    }
}, { timestamps: true })

const DST = mongoose.model("DST", dstSchema);

export default DST