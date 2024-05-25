import express from "express";

import protectRole from "../midlleware/protectRole.js";
import protectRoute from "../midlleware/protectRoute.js";

import { postAnnouncement, getAnnouncement } from "../controllers/announcement-controllers.js";

const router = express.Router();

router.get("/list", protectRoute, getAnnouncement);
router.post("/post", protectRoute, protectRole, postAnnouncement);

export default router