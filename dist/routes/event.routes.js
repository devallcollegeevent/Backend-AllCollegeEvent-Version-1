"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_controller_1 = require("../controllers/event.controller");
const fileUpload_1 = __importDefault(require("../middlewares/fileUpload"));
const router = (0, express_1.Router)();
router.get("/organizations/:orgId/events", event_controller_1.EventController.getOrgEvents);
router.get("/organizations/:orgId/events/:eventId", event_controller_1.EventController.getEventById);
router.post("/organizations/:orgId/events", fileUpload_1.default.single("image"), event_controller_1.EventController.createEvent);
router.put("/organizations/:orgId/events/:eventId", fileUpload_1.default.single("image"), event_controller_1.EventController.updateEvent);
router.delete("/organizations/:orgId/events/:eventId", event_controller_1.EventController.deleteEvent);
// Public API
router.get("/events", event_controller_1.EventController.getAllEvents);
router.get("/events/:eventId", event_controller_1.EventController.getSingleEvent);
exports.default = router;
