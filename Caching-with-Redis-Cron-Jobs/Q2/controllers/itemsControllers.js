const itemsDB = require("../db/itemsDB");
const { redis, invalidateCache } = require("../cache/redisClient");

// GET /items
const getItems = async (req, res) => {
  try {
    const cachedItems = await redis.get("items:all");
    if (cachedItems) {
      console.log("Cache hit ");
      return res.json(JSON.parse(cachedItems));
    }

    console.log("Cache miss Fetching from DB");
    await redis.set("items:all", JSON.stringify(itemsDB), "EX", 60);
    res.json(itemsDB);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// POST /items
const addItem = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).send("Name is required");

    const newItem = { id: itemsDB.length ? itemsDB[itemsDB.length - 1].id + 1 : 1, name };
    itemsDB.push(newItem);

    await invalidateCache("items:all");
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// PUT /items/:id
const updateItem = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    const itemIndex = itemsDB.findIndex(item => item.id === id);
    if (itemIndex === -1) return res.status(404).send("Item not found");

    itemsDB[itemIndex].name = name || itemsDB[itemIndex].name;
    await invalidateCache("items:all");
    res.json(itemsDB[itemIndex]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// DELETE /items/:id
const deleteItem = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const itemIndex = itemsDB.findIndex(item => item.id === id);
    if (itemIndex === -1) return res.status(404).send("Item not found");

    const deletedItem = itemsDB.splice(itemIndex, 1);
    await invalidateCache("items:all");
    res.json(deletedItem[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = { getItems, addItem, updateItem, deleteItem };
