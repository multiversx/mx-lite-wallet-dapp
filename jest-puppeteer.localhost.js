/* eslint-disable */
/* tslint:disable */
const config = require('./jest-puppeteer.config');

delete config.server;

const port = Number(process.env.PORT) || 3002; // use 443 if you want to use https and have hosts mapped;
config.launch.baseUrl = `https://localhost:${port}`;

module.exports = config;
