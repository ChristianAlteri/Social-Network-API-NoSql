const User = require('../models/User');

// Create the object and export directly for clean dopeness
module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json(err);
    }
  },
  getSingleUser: async (req, res) => {
    try {
      const singleUser = await User.findOne({ _id: req.params.userId });
      if (!singleUser) {
        res.status(404).json({ message: 'No user with that ID' })
      }
      res.json(user)
    } catch (error) {
      res.status(500).json(error);
    }
  },
  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body)
      res.json({ msg: 'user added to database successfully'})
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId }, // Filter by _id
        req.body, // Updated data
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
  },
  deleteUser: async (req, res) => {
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
  },
};


