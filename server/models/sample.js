import { Sequelize, DataTypes } from 'sequelize';

import { sequelize } from '../config/database.js';

const User = sequelize.define('User', {
  username: DataTypes.STRING,
  birthday: DataTypes.DATE,
});

// Create a new user
const jane = await User.create({ firstName: 'Jane', lastName: 'Doe' });
console.log("Jane's auto-generated ID:", jane.id);

await sequelize.sync();