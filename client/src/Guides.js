import React, { useState, useEffect } from "react";
import "./Guides.css";

const Guides = () => {
  // State for games and articles data
  const [games, setGames] = useState([]);
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  
  // State for search functionality
  const [gameSearchTerm, setGameSearchTerm] = useState(""); // For filtering by game
  const [titleSearchTerm, setTitleSearchTerm] = useState(""); // For filtering by title
  
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

  // Fetch all articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('/api/articles');
        
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
  }, []);

  // Filter articles based on both game and title search terms
  useEffect(() => {
    const results = articles.filter(article => {
      const gameTitle = games.find(game => game.id === article.gameId)?.title || "";
      const matchesGame = gameTitle.toLowerCase().includes(gameSearchTerm.toLowerCase());
      const matchesTitle = article.title.toLowerCase().includes(titleSearchTerm.toLowerCase());
      
      return (gameSearchTerm === "" || matchesGame) && (titleSearchTerm === "" || matchesTitle);
    });
    
    setFilteredArticles(results);
  }, [gameSearchTerm, titleSearchTerm, articles, games]);

  // Handle game search input change
  const handleGameSearchChange = (e) => {
    setGameSearchTerm(e.target.value);
  };
  
  // Handle title search input change
  const handleTitleSearchChange = (e) => {
    setTitleSearchTerm(e.target.value);
  };

  return (
    <div className="guides-container">
      <h1>Game Guides</h1>
      
      <div className="search-container">
        {/* Game search input on the left */}
        <div className="search-left">
          <input
            type="text"
            placeholder="Filter by game..."
            value={gameSearchTerm}
            onChange={handleGameSearchChange}
            className="search-input"
          />
        </div>
        
        {/* Title search input on the right */}
        <div className="search-right">
          <input
            type="text"
            placeholder="Filter by title..."
            value={titleSearchTerm}
            onChange={handleTitleSearchChange}
            className="search-input"
          />
        </div>
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
            No articles found {gameSearchTerm || titleSearchTerm ? "matching your filters" : ""}
          </div>
        )}
      </div>
    </div>
  );
};

export default Guides;