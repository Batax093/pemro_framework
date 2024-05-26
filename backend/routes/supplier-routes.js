import express from "express";
import { registerSupplier, getSupplier, updateSupplier, applyforDST } from "../controllers/supplier-controllers.js";
import protectRoute from "../midlleware/protectRoute.js";
import protectRole from "../midlleware/protectRole.js";

const router = express.Router();

router.get("/list", protectRoute, getSupplier)
router.post("/register", protectRoute, registerSupplier);
router.post("/permanent", protectRoute, applyforDST);
router.put("/update/:receiverid", protectRoute, protectRole, updateSupplier);

export default router