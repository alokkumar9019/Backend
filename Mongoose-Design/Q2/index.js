require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Routes
app.use(require('./routes/doctor.routes'));
app.use(require('./routes/patient.routes'));
app.use(require('./routes/consultation.routes'));

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running`);
    });
  })
  .catch(err => console.error(err));
