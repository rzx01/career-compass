import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from '../utils/email.js';

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const generateOtpToken = (email, otp) => {
    return jwt.sign({ email, otp }, process.env.JWT_SECRET, { expiresIn: '5m' });
};

export const registerUser = async (req, res, next) => {
    const { username, email, password, contact_number, job, education } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' }); //200-300 : success status ,300-400:data repeat/data already cached,400-500: client side error,500:server error
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({ name: username, email, password: hashedPassword, contact_number, job, education });
        await newUser.save();
        const token = generateToken(newUser._id);
        
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);

        res.status(200).json({ message: 'User logged in', token });
    } catch (error) {
        next(error);
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.user;

        const user = await User.findById(userId).select('-password -createdAt -updatedAt -_id');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { userId } = req.user;
        const { name, email, password, contact_number, job, education } = req.body;

        const updatedData = { name, email, contact_number, job, education };

        if (password) {
            const saltRounds = 10;
            updatedData.password = await bcrypt.hash(password, saltRounds);
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.user;

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const verifyOtp = async (req, res) => {
    const { email, otp, otpToken } = req.body;

    try {
        const decoded = jwt.verify(otpToken, process.env.JWT_SECRET);

        if (decoded.email === email && decoded.otp === otp) {
            return res.status(200).json({ message: 'OTP verified successfully' });
        } else {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        return res.status(400).json({ message: 'OTP verification failed or token expired' });
    }
};


export const verifyToken = async(req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ isValid: false });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ isValid: true });
    } catch (error) {
        res.status(401).json({ isValid: false });   //401: unauthorized
    }
};
 