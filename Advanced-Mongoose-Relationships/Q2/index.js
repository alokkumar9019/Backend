const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
const bookRoutes = require('./routes/book.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());

connectDB();

app.use('/api', userRoutes);
app.use('/api', bookRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
