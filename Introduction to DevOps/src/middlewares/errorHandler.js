const { error } = require('../utils/response');

module.exports = (err, req, res, next) => {
  console.error(err && err.stack ? err.stack : err);
  error(res, { status: 500, message: err.message || 'Internal Server Error' });
};
