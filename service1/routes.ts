import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @swagger
 * /send-operation:
 *   post:
 *     description: Send an operation.
 *     parameters:
 *       - in: body
 *         name: operation
 *         description: The operation object with an "id" field and metadata.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             metadata:
 *               type: object
 *     responses:
 *       200:
 *         description: Operation sent successfully.
 */
router.post('/send-operation', (req: Request, res: Response) => {
    // Implement the logic to send the operation to Service 2 via RabbitMQ
    // You can choose between async or sync here based on the request

    // Return a response based on the chosen mode
    if (req.body.async) {
        // Return immediately
        res.status(200).json({ message: 'Operation sent asynchronously' });
    } else {
        // Wait for Service 2 to process and return the result
        // Implement this part based on your RabbitMQ communication
    }
});

/**
 * @swagger
 * /status/{id}:
 *   get:
 *     description: Get the status of an operation by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the operation.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Operation status retrieved successfully.
 */
router.get('/status/:id', (req: Request, res: Response) => {
    // Implement the logic to fetch the status of the operation by its ID
    // You can choose to store status in a database or communicate with Service 2
    // based on the chosen mode (async or sync)
    const operationId = req.params.id;

    // Return the status or result
    // Implement this part based on your RabbitMQ communication
});

export default router;
