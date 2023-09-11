import express from 'express';
import bodyParser from 'body-parser';
import { swaggerUi, specs } from './swagger'; // Import your Swagger configuration
import amqp from 'amqplib/callback_api';

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// RabbitMQ connection configuration
const rabbitMQHost = process.env.RABBITMQ_HOST || 'localhost';
const rabbitMQUrl = `amqp://${rabbitMQHost}`;

// Define RabbitMQ channel and queue names
const queueName = 'operations';
const statusQueueName = 'status';

// Open a connection to RabbitMQ server
amqp.connect(rabbitMQUrl, (error0, connection) => {
    if (error0) {
        throw error0;
    }

    // Create a channel
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }

        // Declare a queue for receiving operations
        channel.assertQueue(queueName, {
            durable: false,
        });

        // Declare a queue for sending operation status
        channel.assertQueue(statusQueueName, {
            durable: false,
        });

        // Set up an endpoint to receive operations (async)
        app.post('/operation/async', (req, res) => {
            const operation = req.body;

            // Publish the operation to the RabbitMQ queue
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(operation)));

            // Return a response immediately
            res.status(202).json({ message: 'Operation accepted for asynchronous processing' });
        });

        // Set up an endpoint to receive operations (sync)
        app.post('/operation/sync', (req, res) => {
            const operation = req.body;

            // Publish the operation to the RabbitMQ queue
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(operation)));

            // Listen for the response on the status queue
            channel.consume(statusQueueName, (message) => {
                if (message) {
                    // Parse the status message
                    const status = JSON.parse(message.content.toString());

                    // Respond with the status
                    res.status(status.code).json(status);
                }
            });
        });

        // Set up an endpoint to fetch the status of an operation by ID
        app.get('/operation/status/:id', (req, res) => {
            const operationId = req.params.id;

            // Send a request to Service 2 to fetch the status
            // You should implement this part based on your communication method

            // Respond with the status (You should replace this with actual data)
            res.status(200).json({ operationId, status: 'Processing' });
        });

        // Start the Express server
        app.listen(port, () => {
            console.log(`Service 1 is listening on port ${port}`);
        });
    });
});
