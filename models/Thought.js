const {Schema, model} = require('mongoose');

//Schema to create a thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            MaxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (date) => {date.toLocaleString()}
        },
        username: {
            type: String,
            requires: true
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});