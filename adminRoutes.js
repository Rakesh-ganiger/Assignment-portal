// routes/adminRoutes.js
const express = require('express');
const { getAssignments, acceptAssignment, rejectAssignment } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/assignments', authMiddleware('Admin'), getAssignments);
router.post('/assignments/:id/accept', authMiddleware('Admin'), acceptAssignment);
router.post('/assignments/:id/reject', authMiddleware('Admin'), rejectAssignment);

module.exports = router;
