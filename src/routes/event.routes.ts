import { Router } from "express";
import { EventController } from "../controllers/event.controller";
import upload from "../middlewares/fileUpload";

const router = Router();

router.post("/create", upload.single("image") ,EventController.createEvent);

module.exports = router;
