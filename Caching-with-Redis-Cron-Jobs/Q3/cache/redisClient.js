const Redis = require("ioredis");
const redis = new Redis(); 

const invalidateCache = async (key) => {
  await redis.del(key);
};

module.exports = { redis, invalidateCache };
