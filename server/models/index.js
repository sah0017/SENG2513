import sequelize from '../config/database.js';
import Games from './games.js';
import Articles from './articles.js';

// Set up associations between models
const setupAssociations = () => {
  // Define associations if they exist
  if (Games.associate) {
    Games.associate({ Articles });
  }
  
  if (Articles.associate) {
    Articles.associate({ Games });
  }
};

const syncModels = async () => {
  try {
    // Set up associations before syncing
    setupAssociations();
    
    // Sync models with database
    await sequelize.sync({ alter: true }); // Use { force: true } to drop tables
    console.log('All models were synchronized successfully.');
    
    // Seed some example games
    const games = [];
    for (let i = 1; i <= 5; i++) {
      games.push({
        title: `Game ${i}`
      });
    }

    // Insert games into the table
    await Games.bulkCreate(games, { ignoreDuplicates: true })
      .then(() => {
        console.log('Games inserted successfully.');
      })
      .catch((error) => {
        console.error('Error inserting games:', error);
      });
      
  } catch (error) {
    console.error('Error synchronizing models:', error);
  }
};

export {
  sequelize,
  Games,
  Articles,
  syncModels
};