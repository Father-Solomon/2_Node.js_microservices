import express, { Request, Response } from 'express';

const router = express.Router();

// Endpoint to send operations (async)
router.post('/operation/async', (req: Request, res: Response) => {
    // Send operation to Service 2 via RabbitMQ (implement logic here)

    res.status(202).json({ message: 'Operation accepted for asynchronous processing' });
});

// Endpoint to send operations (sync)
router.post('/operation/sync', (req: Request, res: Response) => {
    // Send operation to Service 2 via RabbitMQ (implement logic here)

    // Listen for the response from Service 2 (implement logic here)

    res.status(200).json({ message: 'Operation sent for synchronous processing' });
});

// Endpoint to fetch the status of an operation by ID
router.get('/operation/status/:id', (req: Request, res: Response) => {
    const operationId = req.params.id;

    // Fetch the status of the operation from Service 2 (implement logic here)

    res.status(200).json({ operationId, status: 'Processing' });
});

export default router;
