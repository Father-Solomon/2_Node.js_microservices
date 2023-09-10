import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = process.env.PORT || 3000;

// Swagger configuration
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Producer API',
        version: '1.0.0',
        description: 'API for Microservice 1 Producer',
    },
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.ts'],
};

const specs = swaggerJsdoc(options);

// Middleware to serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
    console.log(`Microservice 1 (Producer) is running on port ${port}`);
});
