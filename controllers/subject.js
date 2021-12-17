const {
  addOneSubject,
  readManySubjects,
  updateOneSubject,
  deleteOneSubject,
} = require('../services/subject');

const success = true;

const addOne = (req, res, next) => {
  const { body } = req;

  addOneSubject(body)
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
  readManySubjects(req.query)
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

  updateOneSubject(body, _id)
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

  deleteOneSubject(_id)
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
