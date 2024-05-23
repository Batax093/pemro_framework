import express from "express";
import { registerSupplier } from "../controllers/supplier-controllers.js";
import protectRoute from "../midlleware/protectRoute.js";

const router = express.Router();

router.post("/register", protectRoute, registerSupplier);

export default router