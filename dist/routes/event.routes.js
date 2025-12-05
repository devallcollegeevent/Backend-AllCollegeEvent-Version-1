"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const event_controller_1 = require("../controllers/event.controller");
const fileUpload_1 = __importDefault(require("../middlewares/fileUpload"));
const router = (0, express_1.Router)();
router.get("/:orgId/events", event_controller_1.EventController.getOrgEvents);
router.get("/:orgId/events/:eventId", event_controller_1.EventController.getEventById);
router.post("/:orgId/events", fileUpload_1.default.single("image"), event_controller_1.EventController.createEvent);
router.put("/:orgId/events/:eventId", fileUpload_1.default.single("image"), event_controller_1.EventController.updateEvent);
router.delete("/:orgId/events/:eventId", event_controller_1.EventController.deleteEvent);
router.get("/eve", authMiddleware_1.authMiddleware, event_controller_1.EventController.getAllEvents);
exports.default = router;
