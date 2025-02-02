import express from "express";
import {
  createListing,
  updateListing,
  deleteListing,
  getListing,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.post("/update/:id", verifyToken, updateListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.get("/get/:id", getListing);

export default router;
