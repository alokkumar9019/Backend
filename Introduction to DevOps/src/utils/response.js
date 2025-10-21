exports.success = (res, { status = 200, data = null, message = 'OK' } = {}) => {
  return res.status(status).json({ success: true, data, message });
};

exports.error = (res, { status = 500, message = 'Internal Server Error', errors = null } = {}) => {
  return res.status(status).json({ success: false, message, errors });
};
