const { Schema, model } = require('mongoose');
const Reaction = require('./reactions');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true
        },
        reactions: [Reaction],
    },
    {
        toJSON: {
          virtuals: true,
        }
      }
);

thoughtSchema 
    .virtual('reactionsCount')
    .get(function () {
        return this.reactions.length;
    });

const Thought = model('thoughts', thoughtSchema);

module.exports = Thought;