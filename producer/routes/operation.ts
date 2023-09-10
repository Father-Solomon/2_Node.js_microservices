import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @swagger
 * /operation:
 *   post:
 *     summary: Receive an operation.
 *     description: This endpoint receives an operation with an "id" field and some metadata.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               metadata:
 *                 type: object
 *     responses:
 *       200:
 *         description: Operation received successfully.
 */
router.post('/operation', (req: Request, res: Response) => {
    // Implement logic to handle the operation and send it to Microservice 2 via RabbitMQ
    // Depending on the selected method (async/sync), handle accordingly
    // ...

    // Return a response based on the chosen method
    res.status(200).json({ message: 'Operation received successfully' });
});

export default router;
