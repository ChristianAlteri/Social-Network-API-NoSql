const router = require('express').Router();
const User = require('../../models/User')
const Thought = require('../../models/Thought')
const { Schema, model } = require('mongoose');

// Get users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

// Create users
router.post('/users', async (req, res) => {
  try {
    const newUser = await User.create({ username: req.body.username, email: req.body.email });
    res.json({ msg: 'User added to the database successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get single user by id
router.get('/users/:userId', async (req, res) => {
  try {
    const singleUser = await User.findOne({ _id: req.params.userId });
    if (!singleUser) {
      res.status(404).json({ message: 'No user with that ID' });
      return;
    }
    res.json(singleUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update user by id
router.put('/users/:userId', async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId }, // Filter by _id
      { username: req.body.username, email: req.body.email }, // Updated data
      { new: true } // return the updated user
    );
    if (!updatedUser) {
      res.status(404).json({ message: 'No user with that ID' });
      return;
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete user by id
router.delete('/users/:userId', async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });

    if (!deletedUser) {
      res.status(404).json({ message: 'No user with that ID' });
      return;
    }
    res.json({ message: 'User deleted successfully :(', deletedUser });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
