// swagger.js



const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Digital Hive API',
      version: '1.0.0',
      description: 'API to manage hives and users',
    },
    servers: [
      {
        url: 'https://digitalhive-ws.andreasalvatoredeveloper.it', // cambia se in produzione
      },
    ],
  },
  apis: ['./routes/*.js'], // dove Swagger legge i commenti
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
