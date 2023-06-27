const router = require('express').Router();

const {
  getUsers,
  getSinglePost,
  postUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(postUser);

router.route('/:userId').get(getSinglePost).put(updateUser).delete(deleteUser);

module.exports = router;