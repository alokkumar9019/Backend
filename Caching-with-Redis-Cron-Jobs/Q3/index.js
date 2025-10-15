const express = require("express");
const bodyParser = require("body-parser");
const itemsRoutes = require("./routes/items");

const app = express();
app.use(bodyParser.json());

app.use("/items", itemsRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
