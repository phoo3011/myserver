import crypto from 'crypto';
import express, { Request, Response } from 'express';

type StoredUser = {
    _id: string;
    name: string;
    email: string;
    password: string;
};

const users: StoredUser[] = [];
const router = express.Router();

router.post('/users', (req: Request, res: Response) => {
    const { name, email, password } = req.body as Partial<StoredUser>;
    if (!name || !email || !password) {
        res.status(400).json({ message: 'Name, email, and password are required' });
        return;
    }

    const user: StoredUser = {
        _id: crypto.randomUUID(),
        name,
        email,
        password,
    };
    users.push(user);
    res.status(201).json({ _id: user._id, name: user.name, email: user.email });
});

router.get('/users', (req: Request, res: Response) => {
    res.json(users.map(({ _id, name, email }) => ({ _id, name, email })));
});

router.get('/users/:id', (req: Request, res: Response) => {
    const user = users.find((candidate) => candidate._id === req.params.id);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    res.json({ _id: user._id, name: user.name, email: user.email });
});

router.delete('/users/:id', (req: Request, res: Response) => {
    const index = users.findIndex((candidate) => candidate._id === req.params.id);
    if (index === -1) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    users.splice(index, 1);
    res.json({ message: 'User deleted' });
});

router.put('/users/:id', (req: Request, res: Response) => {
    const user = users.find((candidate) => candidate._id === req.params.id);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    const updates = (req.body.updateData ?? req.body) as Partial<StoredUser>;
    Object.assign(user, {
        name: updates.name ?? user.name,
        email: updates.email ?? user.email,
        password: updates.password ?? user.password,
    });
    res.json({ _id: user._id, name: user.name, email: user.email });
});

export default router;
