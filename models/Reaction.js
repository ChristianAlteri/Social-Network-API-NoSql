const { Schema, model } = require('mongoose');
const moment = require('moment')

const reactionSchema = new Schema({
    reactionId: {
      type: Schema.Types.ObjectId,
      default: new Schema.Types.ObjectId(),
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

  const Reaction = model('Reaction', reactionSchema);

  module.exports = Reaction;