const router = require('express').Router();

const { addOne, getMany, updateOne, deleteOne } = require('../controllers/sub-topic');

router.put('/add-one', addOne);
router.get('/get-many', getMany);
router.post('/update-one/:_id', updateOne);
router.delete('/delete-one/:_id', deleteOne);

module.exports = router;
