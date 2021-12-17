const {
  addOneTopic,
  readManyTopics,
  updateOneTopic,
  deleteOneTopic,
} = require('../services/topic');

const success = true;

const addOne = (req, res, next) => {
  const { body } = req;

  addOneTopic(body)
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
  readManyTopics(req.query)
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

  updateOneTopic(body, _id)
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

  deleteOneTopic(_id)
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
