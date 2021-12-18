const {
  addOneSubTopic,
  readManySubTopics,
  updateOneSubTopic,
  deleteOneSubTopic,
} = require('../services/sub-topics');

const success = true;

const addOne = (req, res, next) => {
  const { body } = req;

  addOneSubTopic(body)
    .then(() => {
      res.status(201).json({
        success,
      });
    })
    .catch((error) => {
      next(error);
    });
};

const getMany = (req, res, next) => {
  readManySubTopics(req.query)
    .then((data) => {
      res.status(201).json({
        success,
        data,
      });
    })
    .catch((error) => {
      next(error);
    });
};

const updateOne = (req, res, next) => {
  const { body } = req;
  const { _id } = req.params;

  updateOneSubTopic(body, _id)
    .then(() => {
      res.status(201).json({
        success,
      });
    })
    .catch((error) => {
      next(error);
    });
};

const deleteOne = (req, res, next) => {
  const { _id } = req.params;

  deleteOneSubTopic(_id)
    .then(() => {
      res.status(201).json({
        success,
      });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  addOne,
  getMany,
  updateOne,
  deleteOne,
};
