const router = require('express').Router();
const User = require('../../models/User')
const { Thought, Reaction } = require('../../models/Thought')
const { validateReaction } = require('../../helper/validateReaction')

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

// create a reaction
router.put('/thoughts/:thoughtId/reactions', validateReaction, async (req, res) => {
  // deconstruct from return of validateFriendship
  try {
    const { newReaction, thought } = req;
   
    // perform put request on data 
    thought.reactions.push(newReaction);
    await thought.save()
    return res.json({ message: 'reaction added successfully', thought });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
