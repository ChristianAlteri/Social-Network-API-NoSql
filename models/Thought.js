const { Schema, model } = require('mongoose');
const moment = require('moment')

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId, 
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
      type: String,
      default: moment().format(),
      get: (timestamp) => new moment(timestamp).format('MMMM Do YYYY, h:mm:ss a'),
    },
});

const thoughtSchema = new Schema({
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: String,
      default: moment().format(),
      get: (timestamp) => new moment(timestamp).format('MMMM Do YYYY, h:mm:ss a'),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema]
  },
  {
    // Do the same as you did in user to allow mongoos to show you the functions retunr in the json object
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
  );

  thoughtSchema
    .virtual('reactionCount')
    .get(function () {
    return this.reactions.length;
  });



  const Reaction = model('Reaction', reactionSchema);
  const Thought = model('Thought', thoughtSchema);

  module.exports = { Thought, Reaction };


