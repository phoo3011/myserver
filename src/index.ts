import cors from 'cors';
import express, { Request, Response } from 'express';
import path from 'path';
import userRoutes from './InMemoryUserRoutes';

const app = express();
const ports = [
    Number(process.env.PORT) || 3000,
    Number(process.env.SECONDARY_PORT) || 3001,
];

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.get('/users', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'public', 'test.html'));
});

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', userRoutes);

const start = () => {
    ports.forEach((port) => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    });
};

start();
