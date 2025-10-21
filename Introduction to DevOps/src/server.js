require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.warn('MONGO_URI not provided - skipping DB connect (useful in tests)');
    } else {
      await connectDB(process.env.MONGO_URI);
    }
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start', err);
    process.exit(1);
  }
};

start();
