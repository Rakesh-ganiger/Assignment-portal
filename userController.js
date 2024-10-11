// controllers/userController.js
const User = require('../models/User');
const Assignment = require('../models/Assignment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: 'Error logging in', error });
  }
};

const uploadAssignment = async (req, res) => {
  const { task, adminId } = req.body;
  try {
    const assignment = new Assignment({
      userId: req.user.id,
      task,
      adminId,
    });
    await assignment.save();
    res.status(201).json({ message: 'Assignment uploaded successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error uploading assignment', error });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'Admin' }, { _id: 1, name: 1 });
    res.status(200).json(admins);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching admins', error });
  }
};

module.exports = { register, login, uploadAssignment, getAllAdmins };
