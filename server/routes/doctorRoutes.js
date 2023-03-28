import express from "express";
import { addDoctor, getDoctor } from "../controllers/docotorController.js";
import isAdminMiddleware from "../middlewares/isAdminMiddleware.js";
const router = express();

router.route("/add-doctor").post(isAdminMiddleware, addDoctor);
router.route("/get-doctor").get(getDoctor);

export default router;
