import express from 'express';
import { connect, Channel, ConsumeMessage } from 'amqplib';

const app = express();
const port = process.env.PORT || 4000;

// RabbitMQ configuration
const rabbitMQHost = process.env.RABBITMQ_HOST || 'localhost';
const queueName = 'operations';

// Establish a connection to RabbitMQ
async function main() {
    const connection = await connect(`amqp://${rabbitMQHost}`);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName);

    // Consume messages from the RabbitMQ queue
    channel.consume(queueName, (msg: ConsumeMessage | null) => {
        if (msg) {
            const operation = JSON.parse(msg.content.toString());
            console.log('Received operation:', operation);

            // Implement the operation handling logic (e.g., sleep for some time)
            // You can store the status and notify Microservice 1 as needed

            // Acknowledge the message
            channel.ack(msg);
        }
    });

    console.log('Microservice 2 is waiting for operations...');
}

main();

app.listen(port, () => {
    console.log(`Microservice 2 (Consumer) is running on port ${port}`);
});
