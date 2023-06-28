const router = require('express').Router();

const {
  getUsers,
  getSinglePost,
  postUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(postUser);
router.route('/:userId').get(getSinglePost).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;