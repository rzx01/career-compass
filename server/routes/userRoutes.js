import express from 'express';
import { registerUser, loginUser, updateUser, deleteUser , getUserProfile} from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.put('/update', authMiddleware, updateUser);
userRoutes.delete('/delete', authMiddleware, deleteUser);
userRoutes.get('/getProfile', authMiddleware, getUserProfile);
export default userRoutes;
