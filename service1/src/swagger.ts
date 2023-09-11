import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Service 1 API',
            version: '1.0.0',
            description: 'Microservice 1 API with RabbitMQ communication',
        },
    },
    apis: ['./routes/*.ts'],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
