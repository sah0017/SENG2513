// server/index.js
import express from "express";
import company from "./api/json/company.json" with {type: "json"}; // Importing JSON data from a file
import cors from "cors";
import { Games, Articles, syncModels } from "./models/index.js";

const app = express();
const CORS = cors();
app.use(CORS);
app.use(express.json()); // For parsing application/json

const PORT = 3001;

// Sync all models with the database
syncModels();

// Company API route (kept from original)
app.get("/api/company", (req, res) => {
  return res.json(company);
});

// Games routes
app.get("/api/games", async (req, res) => {
  try {
    const games = await Games.findAll();
    return res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    return res.status(500).json({ error: 'Failed to fetch games' });
  }
});

app.get("/api/games/:id", async (req, res) => {
  try {
    const game = await Games.findByPk(req.params.id, {
      include: [{ model: Articles, as: 'articles' }]
    });
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    return res.json(game);
  } catch (error) {
    console.error('Error fetching game:', error);
    return res.status(500).json({ error: 'Failed to fetch game' });
  }
});

// Articles routes
app.get("/api/articles", async (req, res) => {
  try {
    const articles = await Articles.findAll({
      include: [{ model: Games, as: 'game' }]
    });
    return res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

app.get("/api/articles/:id", async (req, res) => {
  try {
    const article = await Articles.findByPk(req.params.id, {
      include: [{ model: Games, as: 'game' }]
    });
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    return res.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    return res.status(500).json({ error: 'Failed to fetch article' });
  }
});

app.post("/api/articles", async (req, res) => {
  try {
    const { title, content, gameId } = req.body;
    const article = await Articles.create({ title, content, gameId });
    return res.status(201).json(article);
  } catch (error) {
    console.error('Error creating article:', error);
    return res.status(500).json({ error: 'Failed to create article' });
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));