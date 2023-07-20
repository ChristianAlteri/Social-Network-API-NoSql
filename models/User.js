// Dependeinces
const { Schema, model } = require('mongoose');
const { isEmail } = require('validator')

// User Schema
  const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [ isEmail, 'invalid email' ],
      // match: /^[\w-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      // isEmail seemed cleaner to handle my email validation
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual reactionCount` that returns the friends.length. We can utilise the array method .length
userSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });


// Initialise 
const User = model('User', userSchema);

module.exports = User;
