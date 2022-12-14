const {Schema, model} = require('mongoose');

//Schema to create a reaction model
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {date.toLocaleString()}
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
)

/* ----------------- for thoughts ----------------- */

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
        reactions: [ reactionSchema ]
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

