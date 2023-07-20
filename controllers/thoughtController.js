const Thought = require('../models/Thought');

// Create the object and export directly for clean dopeness
module.exports = {
  getThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json(err);
    }
  },
  getSingleThought: async (req, res) => {
    try {
      const singleThought = await Thought.findOne({ _id: req.params.userId });
      if (!singleThought) {
        res.status(404).json({ message: 'No thought with that ID' })
      }
      res.json(user)
    } catch (error) {
      res.status(500).json(error);
    }
  },
  createThought: async (req, res) => {
    try {
      const newThought = await Thought.create(req.body)
      res.json({ msg: 'thought added to database successfully'})
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateThought: async (req, res) => {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.userId }, // Filter by _id
        req.body, // Updated data
        { new: true } // return the updated thought
      );
      if (!updatedThought) {
        res.status(404).json({ message: 'No thought with that ID' });
        return;
      }
      res.json(updatedThought);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteThought: async (req, res) => {
    try {
      const deletedThought = await Thought.findOneAndDelete({ _id: req.params.userId });

      if (!deletedThought) {
        res.status(404).json({ message: 'No user with that ID' });
        return;
      }
      res.json({ message: 'Thought deleted successfully :(', deletedThought });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};


