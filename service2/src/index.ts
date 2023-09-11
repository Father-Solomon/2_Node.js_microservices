import express from 'express';
import bodyParser from 'body-parser';
import { swaggerUi, specs } from './swagger'; // Import your Swagger configuration
import amqp from 'amqplib/callback_api';

const app = express();
const port = process.env.PORT || 4000; // Use a different port than Service 1

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// RabbitMQ connection configuration
const rabbitMQHost = process.env.RABBITMQ_HOST || 'localhost';
const rabbitMQUrl = `amqp://${rabbitMQHost}`;

// Define RabbitMQ queue names
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

        // Consume messages from the operations queue
        channel.consume(queueName, (message) => {
            if (message) {
                const operation = JSON.parse(message.content.toString());

                // Simulate processing by sleeping (you can replace this with actual processing logic)
                setTimeout(() => {
                    // Generate a status message
                    const status = {
                        operationId: operation.id,
                        status: 'Completed',
                    };

                    // Publish the status to the status queue
                    channel.sendToQueue(statusQueueName, Buffer.from(JSON.stringify(status)));
                }, 5000); // Simulate 5 seconds of processing

                // Acknowledge the message
                channel.ack(message);
            }
        });

        // Start the Express server
        app.listen(port, () => {
            console.log(`Service 2 is listening on port ${port}`);
        });
    });
});
