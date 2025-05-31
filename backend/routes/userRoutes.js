const express = require('express');
const router = express.Router();
const { createUser, getUsers } = require('../controllers/userController');

// Route to handle form submission
router.post('/', createUser);

// Optional: Fetch all users
router.get('/', getUsers);

module.exports = router;
