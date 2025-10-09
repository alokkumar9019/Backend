require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Routes
app.use(require('./routes/student.routes'));
app.use(require('./routes/course.routes'));
app.use(require('./routes/enrollment.routes'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server running');
    });
  })
  .catch(err => console.error(err));
