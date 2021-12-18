const router = require('express').Router();

const { addOne, getMany, deleteOne } = require('../controllers/suggestion');

router.put('/add-one', addOne);
router.get('/get-many', getMany);
router.delete('/delete-one/:_id', deleteOne);

module.exports = router;
