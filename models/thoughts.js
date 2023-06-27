const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLenght: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true
        },
        // reactions: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'reactions',
        //         required: false,
        //     }
        // ]
    },
    {
        toJSON: {
          virtuals: true,
        }
      }
);

// thoughtSchema 
//     .virtual('reactions')
//     .get(function () {
//         return this.reactions.length;
//     });

const Thought = model('thoughts', thoughtSchema);

module.exports = Thought;