const router = require('express').Router();
const User = require('../models/User')
const { Thought, Reaction } = require('../models/Thought')
const { Schema, model } = require('mongoose');


// I extracted this because we perform he if statements in both friend routes.
const validateFriendship = async (req, res, next) => {
    const { userId, friendId } = req.params;
  
    try {
      // find the user you want to add a friend too
      const user = await User.findById(userId);
      // Find the friend (an existing user that is not the user)
      const friend = await User.findById(friendId);
  
      // Validate the request
      if (userId === friendId) {
        return res.status(400).json({ error: 'Cannot add yourself as a friend' });
      }
      if (!user || !friend) {
        return res.status(404).json({ error: 'User or friend not found' });
      }
  
      // assign the user and friend that you will use in the route
      req.user = user;
      req.friend = friend;
      next(); //go to the route
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  module.exports = { validateFriendship }