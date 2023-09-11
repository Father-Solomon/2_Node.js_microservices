import swaggerJSDoc from 'swagger-jsdoc';

// Swagger JSDoc options
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Service 2 API Documentation',
            version: '1.0.0',
            description: 'API documentation for Service 2.',
        },
        basePath: '/',
    },
    apis: ['./src/routes/*.ts'], // Path to your route files with Swagger annotations
};

// Initialize Swagger JSDoc
const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
