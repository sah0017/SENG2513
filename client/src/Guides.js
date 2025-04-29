import React, { useState, useEffect } from "react";
import "./Guides.css";

const Guides = () => {
  // State for guides data and search functionality
  const [guides, setGuides] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load guides data from JSON file
  useEffect(() => {
    // In a real application, you'd use fetch to get data from your server
    // For demonstration, we're simulating an API call with our sample data
    
    // Simulate loading from an API endpoint
    const fetchGuides = async () => {
      try {
        // In a real app, you would use:
        // const response = await fetch('/api/guides');
        // const data = await response.json();
        
        // For demonstration, we're using a timeout to simulate network delay
        // and hardcoding the response data
        
        // This simulates the JSON data that would come from a server
        const responseData = {
          "guides": [
            {
              "id": 1,
              "title": "Getting Started",
              "content": "Welcome to the Video Game Companion App! This guide will help you understand the basics of the game and how to navigate the interface. Start by exploring the character creation options and selecting your starting class.",
              "category": "beginner",
              "tags": ["tutorial", "basics", "new players"]
            },
            {
              "id": 2,
              "title": "Combat Techniques",
              "content": "Learn advanced combat techniques to defeat powerful enemies. Master the art of parrying, dodging, and counter-attacking to become a formidable warrior.",
              "category": "advanced",
              "tags": ["fighting", "combat", "skills"]
            },
            {
              "id": 3,
              "title": "Character Builds",
              "content": "Explore different character builds and strategies for various playstyles. Whether you prefer ranged combat, melee fighting, or magic spells, this guide provides optimal stat allocations.",
              "category": "intermediate",
              "tags": ["builds", "strategy", "stats"]
            },
            {
              "id": 4,
              "title": "Secret Locations",
              "content": "Discover hidden areas and secret treasures throughout the game world. This guide reveals the locations of rare items, concealed passages, and optional bosses.",
              "category": "advanced",
              "tags": ["exploration", "secrets", "treasures"]
            },
            {
              "id": 5,
              "title": "Crafting Basics",
              "content": "Learn how to craft essential items for your adventure. This guide covers gathering resources, finding recipes, and understanding the crafting system.",
              "category": "beginner", 
              "tags": ["crafting", "items", "resources"]
            },
            {
              "id": 6,
              "title": "Multiplayer Tips",
              "content": "Make the most of your multiplayer experience with these essential tips for cooperative and competitive play.",
              "category": "intermediate",
              "tags": ["multiplayer", "coop", "pvp"]
            },
            {
              "id": 7,
              "title": "Boss Strategy: The Fallen King",
              "content": "A detailed walkthrough on defeating the challenging Fallen King boss. This guide breaks down each phase of the fight.",
              "category": "advanced",
              "tags": ["boss", "strategy", "combat"]
            }
          ]
        };
        
        setTimeout(() => {
          setGuides(responseData.guides);
          setLoading(false);
        }, 800);

      } catch (err) {
        setError("Failed to load guides: " + err.message);
        setLoading(false);
      }
    };
    
    fetchGuides();
  }, []);

  // Get unique categories for filter
  const categories = ["all", ...new Set(guides.map(guide => guide.category))];
  
  // Filter guides based on search term and selected category
  const filteredGuides = guides.filter(guide => {
    // Filter by search term
    const matchesSearch = 
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (guide.tags && guide.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    // Filter by category (if "all" is selected, include all categories)
    const matchesCategory = selectedCategory === "all" || guide.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle category selection
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  
  // Handle tag click to filter by tag
  const handleTagClick = (tag) => {
    setSearchTerm(tag);
  };



  return (
    <div className="guides-container">
      <h1>Game Guides</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search guides..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <div className="filter-container">
          <select 
            value={selectedCategory} 
            onChange={handleCategoryChange}
            className="category-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="guides-list">
        {filteredGuides.length > 0 ? (
          filteredGuides.map(guide => (
            <div key={guide.id} className="guide-card">
              <h2 className="guide-title">{guide.title}</h2>
              <div className="guide-meta">
                <span className="guide-category">{guide.category}</span>
                {guide.tags && guide.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="guide-tag" 
                    onClick={() => handleTagClick(tag)}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <p className="guide-content">{guide.content}</p>
            </div>
          ))
        ) : (
          <div className="no-results">No guides found matching "{searchTerm}"</div>
        )}
      </div>
    </div>
  );
};

export default Guides;