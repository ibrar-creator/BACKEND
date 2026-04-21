const Radis = require('ioredis').default;


const redis = new Radis({
    port: process.env.RADIS_PORT,
    host: process.env.RADIS_HOST,
    password: process.env.RADIS_PASSWORD

});

module.exports = redis;
