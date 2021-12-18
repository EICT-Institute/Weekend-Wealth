const router = require('express').Router();

const subject = require('./subject');
const topic = require('./topic');
const subTopic = require('./sub-topic');
const suggestion = require('./suggestion');

router.use('/subjects', [subject]);
router.use('/topics', [topic]);
router.use('/sub-topics', [subTopic]);
router.use('/suggestions', [suggestion]);

module.exports = router;
