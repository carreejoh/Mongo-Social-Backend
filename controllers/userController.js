const { User } = require('../models');

module.exports = {

    async getUsers(req, res) {
        try {
            const users = await User.find()
                .populate({ path: 'friends', select: '-__v' });
                res.json(users);
        } catch (err) {
            console.error({ message: err });
            res.status(500).json(err);
        }
    },

    //Do route for single user

    async postUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },


};