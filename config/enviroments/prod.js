const server = {
  port: process.env.PORT || 3000,
};
  
module.exports = {
  env: 'prod',
  server,
  mongodb: {
    url: process.env.MONGODB_URL || '',
  },
};