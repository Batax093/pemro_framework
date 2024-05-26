import Announcement from "../models/announcement-models.js";

export const postAnnouncement = async (req, res) => {
    try {
        const { title, content } = req.body

        const newAnnouncement = new Announcement({
            title,
            content
        })

        await newAnnouncement.save()

        res.status(201).json({ message: "Announcement posted successfully!"})
        
    } catch (error) {
        console.log("Error while posting announcement: ", error.message)
        return res.status(500).json({ error: "Internal server error" })
    }
}

export const getAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.find().select("title content -_id")

        if (!announcement) {
            return res.status(404).json({ error: "Announcement not found!"})
        }

        return res.status(201).json({announcement})
    } catch (error) {
        console.log("Error while getting announcement: ", error.message)
        return res.status(500).json({ error: "Internal server error" })
    }
}