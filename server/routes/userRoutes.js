import express from 'express';
import { registerUser, loginUser, updateUser, deleteUser , getUserProfile, verifyOtp, verifyToken} from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.put('/update', authMiddleware, updateUser);
userRoutes.delete('/delete', authMiddleware, deleteUser);
userRoutes.get('/getProfile', authMiddleware, getUserProfile);
userRoutes.post('/verify-otp', verifyOtp);
userRoutes.get('/verify-token', verifyToken);

export default userRoutes;
