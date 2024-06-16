import express from "express";
import dotenv  from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToMongoDB from "../backend/config/connectToMongo.js";

import authRoutes from "../backend/routes/auth-routes.js"
import supplierRoutes from "../backend/routes/supplier-routes.js"
import announcementRoutes from "../backend/routes/announcement-routes.js"
import dstRoutes from "../backend/routes/dst-routes.js"

const app = express();

dotenv.config()

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/supplier", supplierRoutes)
app.use("/api/announcement", announcementRoutes)
app.use("/api/dst", dstRoutes)

app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err);
    res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`)
})
