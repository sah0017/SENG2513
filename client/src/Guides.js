import React, { useState, useEffect } from "react";
import "./Guides.css";

const Guides = () => {
  // State for games and articles data
  const [games, setGames] = useState([]);
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  
  // State for search functionality
  const [selectedGameId, setSelectedGameId] = useState(""); // For game selection
  const [articleSearchTerm, setArticleSearchTerm] = useState(""); // For article search
  
  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch games from the database
  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/games');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setGames(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load games: " + err.message);
        setLoading(false);
      }
    };
    
    fetchGames();
  }, []);

  // Fetch articles based on selected game
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        
        // If no game is selected, fetch all articles
        const endpoint = selectedGameId 
          ? `/api/articles?gameId=${selectedGameId}` 
          : '/api/articles';
        
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setArticles(data);
        setFilteredArticles(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load articles: " + err.message);
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, [selectedGameId]);

  // Filter articles based on search term
  useEffect(() => {
    const results = articles.filter(article =>
      article.title.toLowerCase().includes(articleSearchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(articleSearchTerm.toLowerCase())
    );
    
    setFilteredArticles(results);
  }, [articleSearchTerm, articles]);

  // Handle game selection change
  const handleGameChange = (e) => {
    setSelectedGameId(e.target.value);
  };
  
  // Handle article search input change
  const handleArticleSearchChange = (e) => {
    setArticleSearchTerm(e.target.value);
  };

  return (
    <div className="guides-container">
      <h1>Game Guides</h1>
      
      <div className="search-container">
        {/* Game selection dropdown */}
        <div className="game-select-container">
          <select 
            value={selectedGameId} 
            onChange={handleGameChange}
            className="game-select"
          >
            <option value="">All Games</option>
            {games.map(game => (
              <option key={game.id} value={game.id}>
                {game.title}
              </option>
            ))}
          </select>
        </div>
        
        {/* Article search input */}
        <input
          type="text"
          placeholder="Search articles..."
          value={articleSearchTerm}
          onChange={handleArticleSearchChange}
          className="search-input"
        />
      </div>
      
      <div className="guides-list">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error">Error: {error}</div>
        ) : filteredArticles.length > 0 ? (
          filteredArticles.map(article => (
            <div key={article.id} className="guide-card">
              <h2 className="guide-title">{article.title}</h2>
              <div className="guide-meta">
                <span className="guide-category">
                  {games.find(game => game.id === article.gameId)?.title || "Unknown Game"}
                </span>
              </div>
              <p className="guide-content">{article.content}</p>
            </div>
          ))
        ) : (
          <div className="no-results">
            No articles found {articleSearchTerm ? `matching "${articleSearchTerm}"` : ""}
          </div>
        )}
      </div>
    </div>
  );
};

export default Guides;