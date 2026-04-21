require('dotenv').config();
const app = require('./src/app');
const redis = require('./src/config/cache');
const connectDB = require('./src/config/database');

redis.on('connect', () => {
    console.log('Connected to Redis');
});

connectDB()


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});