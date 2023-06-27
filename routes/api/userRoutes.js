const router = require('express').Router();

const {
  getUsers,
  postUser,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(postUser);

// router.route('/:postId').get(getSinglePost);

module.exports = router;