/**
 * @file Swagger configuration
 * @description Sets up Swagger UI for API documentation
 */

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FitBridge API',
      version: '1.0.0',
      description: 'API documentation for the FitBridge fitness platform'
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Local development server'
      }
    ]
  },
   components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    responses: {
      UnauthorizedError: {
        description: 'JWT token is missing or invalid',
        content: {
          'application/json': {
            example: {
              error: 'Access denied. No token provided.',
            },
          },
        },
      },
      ValidationError: {
        description: 'Request body failed validation',
        content: {
          'application/json': {
            example: {
              error: 'Missing required fields',
            },
          },
        },
      },
      ServerError: {
        description: 'Unexpected server error',
        content: {
          'application/json': {
            example: {
              error: 'Something went wrong',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js', './controllers/*.js', './models/*.js'] // JSDoc sources
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = setupSwagger;