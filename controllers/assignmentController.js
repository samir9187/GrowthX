const Assignment = require("../models/Assignment");

//upload assignment

exports.uploadAssignment = async (req, res) => {
  const { task, admin } = req.body;
  if (!task || !admin) {
    return res.status(400).json({ message: "Task and admin are required" });
  }
  try {
    const assignment = new Assignment({
      userId: req.user.id,
      task,
      admin,
    });

    await assignment.save();
    return res
      .status(201)
      .json({ message: "Assignment uploaded successfully" });
  } catch (err) {
    console.error("Error uploading assignment:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

//get all assignment by admin
exports.getAdminAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ admin: req.user.id })
      .populate("userId", "username")
      .sort({ createdAt: -1 });
    return res.json(assignments);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

//accept assignment
exports.acceptAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });

    assignment.status = "accepted";
    await assignment.save();
    return res.json({ message: "Assignment accepted" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

//assignment reject
exports.rejectAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });

    assignment.status = "rejected";
    await assignment.save();
    return res.json({ message: "Assignment rejected" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
