import sequelize from '../config/database.js';
import User from './user.js';
import Games from './games.js';
import Notes from './notes.js';
import Articles from './articles.js';

const syncModels = async () => {
    try {
      await sequelize.sync({ alter: true }); // Use { force: true } to drop tables
      console.log('All models were synchronized successfully.');
    } catch (error) {
      console.error('Error synchronizing models:', error);
    }
    // Generate 10 users
    const users = [];
    for (let i = 1; i <= 10; i++) {
        users.push({
            username: `User ${i}`,
            // Add other properties as needed
        });
    }

    // Insert users into the table
    User.bulkCreate(users)
        .then(() => {
            console.log('Users inserted successfully.');
        })
        .catch((error) => {
            console.error('Error inserting users:', error);
        });

    const games = [];
    for (let i = 1; i <= 10; i++) {
        users.push({
            title: `Game ${i}`,
            // Add other properties as needed
        });
    }

    // Insert games into the table
    User.bulkCreate(games)
        .then(() => {
            console.log('Games inserted successfully.');
        })
        .catch((error) => {
            console.error('Error inserting games:', error);
        });

  };
  
 export {
    sequelize, User, syncModels
  };
  