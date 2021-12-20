const router = require('express').Router();

const {
  addOne,
  getMany,
  updateOne,
  deleteOne,
  searchByName,
} = require('../controllers/subject');

router.put('/add-one', addOne);
router.get('/get-many', getMany);
router.post('/update-one/:_id', updateOne);
router.delete('/delete-one/:_id', deleteOne);
router.get('/search', searchByName);

module.exports = router;
