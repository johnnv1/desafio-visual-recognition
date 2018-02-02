require('dotenv').config();

const config = {
  vrApiKey: process.env.VR_API_KEY,
  vrClassifierId: process.env.VR_CLASSIFIER_ID,
};

module.exports = config;
