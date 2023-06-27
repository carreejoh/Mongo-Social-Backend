const router = require('express').Router();

const {
    getThoughts,
    postThought,
    getSingleThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtsController');

router.route('/').get(getThoughts).post(postThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

module.exports = router;