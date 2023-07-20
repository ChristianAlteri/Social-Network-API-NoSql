const { Schema, model } = require('mongoose');
const moment = require('moment')
const { reactionSchema, reactions, Reaction} = require('./Reaction')

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
  });

  thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

  const Thought = model('Thought', thoughtSchema);

  module.exports = Thought;