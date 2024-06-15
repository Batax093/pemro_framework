import mongoose, { Schema} from "mongoose";

const announcementSchema = new mongoose.Schema({
    supplierid: {
        type: Schema.Types.ObjectId,
        ref: "supplierid",
        required: false
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
}, {timestamps: true})

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement