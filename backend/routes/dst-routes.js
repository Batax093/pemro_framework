import express from "express"

import protectRoute from "../midlleware/protectRoute.js"
import protectRole from "../midlleware/protectRole.js"

import { approveDST, getDST } from "../controllers/dst-controllers.js"

const router = express.Router()

router.get('/list', protectRoute, getDST)
router.put('/approve/:receiverid', protectRoute, protectRole, approveDST)

export default router