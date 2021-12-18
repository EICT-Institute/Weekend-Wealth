/* eslint-disable max-len */

const jwt = require('jsonwebtoken');
const config = require('../config/env');

const JWT_SECRET = config.JWT_SECRET;

const generateToken = (data, time) =>
  new Promise((resolve, reject) => {
    jwt.sign(data, JWT_SECRET, { expiresIn: time ? `${time}h` : '12h' }, (err, token) => {
      if (err) reject(err);

      resolve(token);
    });
  });

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) reject(err);

      resolve(decoded);
    });
  });

module.exports = {
  generateToken,
  verifyToken,
};
