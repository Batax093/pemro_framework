import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
}, {timestamps: true})

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement