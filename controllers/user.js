const User = require("../models/User")

const getalluser = async (req, res) => {

    try {

        const user = await User.find({})

        if (!user) return res.status(404).json('user not exist')

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getuser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id)

        if (!user) return res.status(404).json('user not exist')

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error)
    }
}

const getuserName = async (req, res) => {

    try {
        const user = await User.findOne({ username: req.params.username })
        if (!user) return res.status(404).json("user not found")

        const { password, updatedAt, isAdmin, ...other } = user._doc;
        res.status(200).json(other)

    } catch (error) {
        res.status(500).json(error)
    }
}

const followuser = async (req, res) => {

    const { userId } = req.body

    try {
        const user = await User.findById(req.params.id);
        const me = await User.findById(userId);

        if (user.followers.includes(userId)) {
            await user.updateOne({ $pull: { followers: userId } });
            await me.updateOne({ $pull: { followings: user._id } });
            res.status(200).json("user has been unfollowed");
        }
        if (!user.followers.includes(userId)) {
            await user.updateOne({ $push: { followers: userId } });
            await me.updateOne({ $push: { followings: user._id } });
            res.status(200).json("user has been followed");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const updatepic = async (req, res) => {

    const { profilepic } = req.body

    try {
        const user = await User.findById(req.params.id);

        if (!user) return res.status(404).json('user not found')

        await user.updateOne({ $set: { profilepic: profilepic } }, { new: true })
        res.status(200).json("profile pic updated")
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = { getuser, followuser, getalluser, getuserName, updatepic }