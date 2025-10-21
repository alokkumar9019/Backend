const mongoose = require('mongoose');

const connectDB = async (mongoUri) => {
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return mongoose;
};

module.exports = connectDB;
