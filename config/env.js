'use strict';

const env = {
  DATABASE_NAME: process.env.ULTIMATE_CRM_DATABASE_NAME || 'ultimate_crm',
  DATABASE_HOST: process.env.ULTIMATE_CRM_DATABASE_HOST || 'localhost',
  DATABASE_USERNAME: process.env.ULTIMATE_CRM_DATABASE_USERNAME || 'root',
  DATABASE_PASSWORD: process.env.ULTIMATE_CRM_DATABASE_PASSWORD || '',
  DATABASE_DIALECT: process.env.ULTIMATE_CRM_DATABASE_DIALECT || 'mysql',
  NODE_ENV: process.env.ULTIMATE_CRM_NODE_ENV || 'development',
};

module.exports = env;