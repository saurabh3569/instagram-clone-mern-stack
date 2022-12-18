const Post = require("../models/Post")
const User = require("../models/User")


const createpost = async (req, res) => {
    const { userId, title, body, photo } = req.body

    const newPost = new Post({ userId, title, body, photo })
    const user = await User.findById(userId)

    try {
        const post = await newPost.save()
        await user.updateOne({ $push: { posts: post._id } })
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}


const deletepost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const user = await User.findById(post.userId)

        if (!post) return res.status(404).json("post not found")

        if (user.posts.includes(post._id))
            await user.updateOne({ $pull: { posts: post._id } })

        await post.deleteOne({ $set: req.body })
        res.status(200).json("post deleted successfully")
    } catch (error) {
        res.status(500).json(error)
    }
}


const mypost = async (req, res) => {
    try {
        const post = await Post.find({ userId: req.params.id })

        if (!post) return res.status(404).json("post not found")

        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}


const getallpost = async (req, res) => {
    try {
        const post = await Post.find({})

        if (!post) return res.status(404).json("post not found")

        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}


const likepost = async (req, res) => {
    const { userId } = req.body

    try {
        const post = await Post.findById(req.params.id);
        if (post.likes.includes(userId)) {
            await post.updateOne({ $pull: { likes: userId } });
        }
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } });
            res.status(200).json("post has been liked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}


const commentpost = async (req, res) => {
    const { userId, body } = req.body

    try {
        const post = await Post.findById(req.params.id);

        await post.updateOne({ $push: { comments: { userId, body } } });
        res.status(200).json("post has been commented");
    } catch (err) {
        res.status(500).json(err);
    }
}




module.exports = { createpost, deletepost, mypost, getallpost, likepost, commentpost } 