import express from 'express'
import jwt from 'jsonwebtoken'
import { forgotPassword, Login, LogOut, signUp } from '../controllers/authControllers.js';

const router = express.Router();

router.post('/signup',signUp);
router.post('/login',Login);
router.get('/logout',LogOut);
router.put('/forgotpassword', forgotPassword);
router.get('/verifyToken', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token is required' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        res.json(user);
    });
});

export default router;