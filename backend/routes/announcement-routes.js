import express from "express";

import protectRole from "../midlleware/protectRole.js";
import protectRoute from "../midlleware/protectRoute.js";

import { postAnnouncement } from "../controllers/announcement-controllers.js";

const router = express.Router();

router.post("/post", protectRoute, protectRole, postAnnouncement);

export default router