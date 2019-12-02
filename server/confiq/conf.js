const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    afApiKey: process.env.AF_API_KEY,
    port: process.env.PORT
};