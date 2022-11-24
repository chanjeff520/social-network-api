const {Schema, model} = require('mongoose');
//const thoughtSchema = require('./Thought');

//Schema to create User Model
const userSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    }
)