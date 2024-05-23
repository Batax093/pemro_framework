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