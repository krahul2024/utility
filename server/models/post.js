import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    by:{
        type:Schema.Types.ObjectId, 
        ref:'User'
    },
    title: String,
    caption: String,
    photos: [],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {timestamps : true})

export default model('Post', postSchema);