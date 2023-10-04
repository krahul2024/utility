import User from '../models/user.js'
import Post from '../models/post.js'
import crypt from 'crypto'
import { connect_database } from '../config.js'


export const newPost = async (req, res) => {
    connect_database();

    console.log('Inside the create post function.')

    try {
        const { by, caption, photos } = req.body;

        const newPost = new Post({
            by,
            caption,
            photos
        });

        const user = await User.findById(by)
        if (!user) {
            throw new Error('User not found.');
        }

        const postResponse = await newPost.save();
        if (!postResponse) {
            throw new Error('An error occurred while saving the post.');
        }

        user.posts.push(postResponse._id);
        const updatedUser = await user.save();
        if (!updatedUser) {
            throw new Error('An error occurred while saving the user.');
        }
        await updatedUser.populate('posts')

        return res.status(200).json({
            success: true,
            msg: 'Post created successfully.',
            post: postResponse,
            user: updatedUser
        });
    } catch (error) {
        console.log({ Message: error.message, error });
        return res.status(500).json({
            success: false,
            msg: 'There was an error while posting.',
        });
    }
};