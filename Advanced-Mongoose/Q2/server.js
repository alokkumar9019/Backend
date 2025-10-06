const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/nested-user-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB error:", err));

app.use("/api", userRoutes);
app.use(errorHandler);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
