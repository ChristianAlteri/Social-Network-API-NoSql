const router = require('express').Router();
// Deconstruct functions out of thoughtController export
const { getThoughts, getSingleThought, createThought, updateThought, deleteThought } = require('../../controllers/thoughtController.js');
// assign the functions to the get or post request
router.route('/thoughts').get(getThoughts)
router.route('/thoughts').post(createThought);

router.route('/thoughts').get(getSingleThought);
router.route('/thoughts').post(updateThought);
router.route('/thoughts').delete(deleteThought);

module.exports = router;