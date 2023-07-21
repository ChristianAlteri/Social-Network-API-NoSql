const router = require('express').Router();
const User = require('../models/User')
const { Thought, Reaction } = require('../models/Thought')
const { Schema, model } = require('mongoose');

const validateReaction = async (req, res, next) => {
    const { thoughtId } = req.params;
  
    try {
      const newReaction = {
        reactionBody: req.body.reactionBody,
        username: req.body.username,
      };
  
      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $push: { reactions: newReaction } },
        { new: true }
      );

  
      // Validate the request
      if (!thought) {
        return res.status(404).json({ error: 'User or friend not found' });
      }
  
      // assign the user and friend that you will use in the route
      req.thought = thought;
      req.newReaction = newReaction;
      next(); //go to the route
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  module.exports = { validateReaction }