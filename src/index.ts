import cors from 'cors';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import userRoutes from './UserRoutes';

const app = express();
const port = Number(process.env.PORT) || 3000;
const mongoURI = process.env.MONGODB_URI;

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'public', 'test.html'));
});

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', userRoutes);

const start = async () => {
    if (!mongoURI) {
        throw new Error('MONGODB_URI is required');
    }

    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

start().catch((error) => {
    console.error('Error starting server:', error);
    process.exitCode = 1;
});
