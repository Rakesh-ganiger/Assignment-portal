// controllers/adminController.js
const Assignment = require('../models/Assignment');

const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ adminId: req.user.id })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });
    res.status(200).json(assignments);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching assignments', error });
  }
};

const acceptAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    assignment.status = 'Accepted';
    await assignment.save();
    res.status(200).json({ message: 'Assignment accepted' });
  } catch (error) {
    res.status(400).json({ message: 'Error accepting assignment', error });
  }
};

const rejectAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    assignment.status = 'Rejected';
    await assignment.save();
    res.status(200).json({ message: 'Assignment rejected' });
  } catch (error) {
    res.status(400).json({ message: 'Error rejecting assignment', error });
  }
};

module.exports = { getAssignments, acceptAssignment, rejectAssignment };
