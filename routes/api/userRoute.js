const router = require('express').Router();
const User = require('../../models/User')
const { Thought, Reaction } = require('../../models/Thought')
const { Schema, model } = require('mongoose');
const { validateFriendship } = require('../../helper/validateFriendship')

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

// Add an existing user to an existing users friend list 

router.put('/users/:userId/friends/:friendId', validateFriendship, async (req, res) => {
  // deconstruct from return of validateFriendship
  try {
    const { user, friend } = req;
   
    // perform put request on data 
    user.friends.push(friend);
    await user.save()
    return res.json({ message: 'Friend added successfully', user });

  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// delete from friends array
router.delete('/users/:userId/friends/:friendId', validateFriendship, async (req, res) => {
  
  try {
    const { user, friend } = req

    // Validate the request
    if (!user.friends.includes(friend._id)) {
      // Check if the friendId exists in the user's friends array
      return res.status(400).json({ error: 'Friend not found in user\'s friend list' });
    }

    // if all the validators pass then we can pull the friend out of the array
    user.friends.pull(friend._id)
    await user.save()
    return res.json({ msg: 'friend removed successfully', user})
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
}
});


module.exports = router;
