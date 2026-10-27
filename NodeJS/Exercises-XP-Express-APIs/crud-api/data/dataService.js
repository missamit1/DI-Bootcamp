const axios = require("axios");

async function fetchPosts() {
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts", { timeout: 15000 });
  return response.data;
}

module.exports = { fetchPosts };
