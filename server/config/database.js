import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({dialect: 'sqlite',
                                storage: '../database/data.sqlite'}); // Example for sqlite

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

export default sequelize;
export { sequelize };