const {Schema, model, Types} = require('mongoose');

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