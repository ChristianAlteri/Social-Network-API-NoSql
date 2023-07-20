const router = require('express').Router();
// Deconstruct functions out of userController export
const { getUsers, getSingleUser, createUser, updateUser, deleteUser } = require('../../controllers/userController.js');
// assign the functions to the get or post request
router.route('/user').get(getUsers)
router.route('/user').post(createUser);

router.route('/user/:userId').get(getSingleUser);
router.route('/user/:userId').post(updateUser);
router.route('/user/:userId').delete(deleteUser);

module.exports = router;