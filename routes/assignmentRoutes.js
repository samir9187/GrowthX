//Routes for assignments

const express = require("express");
const {
  uploadAssignment,
  getAdminAssignments,
  acceptAssignment,
  rejectAssignment,
} = require("../controllers/assignmentController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/upload", authMiddleware, uploadAssignment);
router.get("/assignments", authMiddleware, getAdminAssignments);
router.post("/assignments/:id/accept", authMiddleware, acceptAssignment);
router.post("/assignments/:id/reject", authMiddleware, rejectAssignment);

module.exports = router;
