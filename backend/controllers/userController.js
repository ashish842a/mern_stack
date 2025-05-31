const User = require('../models/User');
const axios = require('axios');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const formData = req.body;

    // Predict age using agify API
    const agifyResponse = await axios.get(`https://api.agify.io?name=${formData.fullName.split(' ')[0]}`);
    const predictedAge = agifyResponse.data.age;

    const newUser = new User({
      ...formData,
      predictedAge,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Optional: Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
