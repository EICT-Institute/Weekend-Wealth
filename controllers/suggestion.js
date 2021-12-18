const {
  addOneSuggestion,
  readManySuggestions,
  deleteOneSuggestion,
} = require('../services/suggestions');

const success = true;

const addOne = (req, res, next) => {
  const { body } = req;

  addOneSuggestion(body)
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
  readManySuggestions(req.query)
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

const deleteOne = (req, res, next) => {
  const { _id } = req.params;

  deleteOneSuggestion(_id)
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
  deleteOne,
};
