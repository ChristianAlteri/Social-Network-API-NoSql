const router = require('express').Router();
const User = require('../../models/User')
const { Thought, Reaction } = require('../../models/Thought')

// Get all thoughts
router.get('/thoughts', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Create a new thought
router.post('/thoughts', async (req, res) => {
  try {
    const newThought = await Thought.create({ thoughtText: req.body.thoughtText,
    username: req.body.username });
    res.json({ msg: 'Thought added to the database successfully', newThought });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get single thought by id
router.get('/thoughts/:thoughtId', async (req, res) => {
  try {
    const singleThought = await Thought.findOne({ _id: req.params.thoughtId });
    if (!singleThought) {
      res.status(404).json({ message: 'No thought with that ID' });
      return;
    }
    res.json(singleThought);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update thought by id
router.put('/thoughts/:thoughtId', async (req, res) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId }, // Filter by _id
      { thoughtText: req.body.thoughtText,
        username: req.body.username }, // Updated data
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
});

// Delete thought by id
router.delete('/thoughts/:thoughtId', async (req, res) => {
  try {
    const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

    if (!deletedThought) {
      res.status(404).json({ message: 'No thought with that ID' });
      return;
    }
    res.json({ message: 'Thought deleted successfully :(', deletedThought });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
