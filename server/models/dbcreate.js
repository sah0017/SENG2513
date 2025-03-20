const User = require('./user'); // Assuming user.js exports the User model

// Generate 10 users
const users = [];
for (let i = 1; i <= 10; i++) {
    users.push({
        name: `User ${i}`,
        email: `user${i}@example.com`,
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

    export default User;