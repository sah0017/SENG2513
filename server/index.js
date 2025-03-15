// server/index.js
const express = require("express");
const sample = require("./api/sample/sample.json");
const app = express();
const cors = require("cors"); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const CORS = cors();
const PORT = 3001;
import { User } from '../models/sample.js';

console.log("Sample data loaded:", sample);
app.use(CORS);

app.get("/api/sample", (req, res) => {
  return res.json(sample);
});

app.get("/api/sample2", async (req, res) => {
  // Find all users
    const users = await User.findAll();
    console.log(users.every(user => user instanceof User)); // true
    console.log('All users:', JSON.stringify(users, null, 2));
  return JSON.stringify(users, null, 2);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
