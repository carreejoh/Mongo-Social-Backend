const { User, Thought, Reactions } = require('../models');

module.exports = {

    async getThoughts(req, res) {
        try{
            const thoughts = await Thought.find({})
            .select('-__v');
                res.json(thoughts);
        } catch (err) {
            console.error(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
           
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async postThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'Thought created, but not User found' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body)
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.deleteOne({ _id: req.params.thoughtId })
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json({ message: "Thought deleted successfully"});
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body} },
                { new: true }
            );

            if(!thought) {
                return res.status(404).json({ message: 'Something went wrong' })
            }

            res.json(thought);
        } catch (err) {
            console.error(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionsId: req.params.reactionsId } } },
                { new: true }
            );
            if(!thought) {
                return res.status(404).json({ message: 'Something went wrong' })
            }
            res.json(thought);
        } catch (err) {
            console.error(err);
        }
    }

};