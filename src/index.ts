import express, { Request, Response } from 'express';
import { Utils } from './Utils';

import mogoose from 'mongoose';
import userRoutes from './UserRoutes';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = 'mongodb+srv://phooriwat3011_db_user:phoo3011@myserver.sgsfo5m.mongodb.net/?appName=myserver';

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running ${port}`);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', userRoutes);

mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
    });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });