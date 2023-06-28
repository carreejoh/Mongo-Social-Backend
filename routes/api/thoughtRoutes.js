const router = require('express').Router();

const {
    getThoughts,
    postThought,
    getSingleThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtsController');

router.route('/').get(getThoughts).post(postThought);
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);


module.exports = router;