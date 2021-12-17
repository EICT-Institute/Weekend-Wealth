const router = require('express').Router();

const subject = require('./subject');
const topic = require('./topic');

router.use('/subjects', [subject]);
router.use('/topics', [topic]);

module.exports = router;
