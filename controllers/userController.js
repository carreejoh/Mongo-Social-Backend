const { User } = require('../models');

module.exports = {

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async postUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, req.body)
            .populate({ path: 'friends', select: '-__v' });
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.deleteOne({ _id: req.params.userId })
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json({ message: "User deleted successfully"});
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async addFriend(req, res) {
        try{
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );
            res.json(user);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    }
};