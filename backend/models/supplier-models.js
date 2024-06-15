import mongoose, { Schema } from "mongoose";

const supplierSchema = new mongoose.Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profile: {
        supplierName: {
            type: String,
            required: true
        },
        companyName: { 
            type: String, 
            required: true 
        },
        phone: { 
            type: String, 
            required: true 
        },
        address: { 
            type: String, 
            required: true 
        },
        comodity: { 
            type: String, 
            required: true 
        },
    },
    // goods: [{ type: Schema.Types.ObjectId, ref: "Goods" }],
    isDST: { 
        type: Boolean,
        required: true, 
        default: false 
    },
}, { timestamps: true }
)

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier