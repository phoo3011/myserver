import { Request, Response } from 'express';
import User from './User';

// create
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// get
export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

//get by id
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error });
    }
};

// delete
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

// update
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { updateData } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    }   catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};