const router = require('express').Router();

const subject = require('./subject');
const topic = require('./topic');
const subTopic = require('./sub-topic');
const suggestion = require('./suggestion');
const { generateToken } = require('../utils/token');

router.get('/get-token', (req, res, next) => {
  generateToken({ _id: `${new Date()}` }).then((data) => {
    res.status(201).json({
      success: true,
      data,
    });
  });
});

router.use('/subjects', [subject]);
router.use('/topics', [topic]);
router.use('/sub-topics', [subTopic]);
router.use('/suggestions', [suggestion]);

module.exports = router;
