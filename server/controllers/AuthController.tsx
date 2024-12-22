import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import UserRepository from '../services/UserRepository';

class AuthController {
    // User login method
    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            // Find user by email
            const user = await UserRepository.findByEmail(email);
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Compare passwords
            const isPasswordValid = await AuthService.comparePassword(
                password,
                user.password
            );

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate tokens
            const accessToken = AuthService.generateAccessToken(user);
            const refreshToken = AuthService.generateRefreshToken(user);

            // Store refresh token in database 
            await UserRepository.updateRefreshToken(user.id, refreshToken);

            res.json({
                accessToken,
                refreshToken,
                user: {
                    id: user.id,
                    email: user.email 
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error during login' });
        }
    }

    // Token refresh method
    static async refreshToken(req: Request, res: Response) {
        try {
            const { refreshToken } = req.body;

            // Verify refresh token
            const decoded = AuthService.verifyRefreshToken(refreshToken);
            if (!decoded) {
                return res.status(401).json({ message: 'Invalid refresh token' });
            }

            // Find user and validate stored refresh token
            const user = await UserRepository.findById(decoded.userId);
            if (!user || user.refreshToken !== refreshToken) {
                return res.status(401).json({ message: 'Invalid refresh token' });
            }

            // Generate new tokens
            const newAccessToken = AuthService.generateAccessToken(user);
            const newRefreshToken = AuthService.generateRefreshToken(user);

            // Update refresh token in database
            await UserRepository.updateRefreshToken(user.id, newRefreshToken);

            res.json({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error during token refresh' });
        }
    }

    // User registration method
    static async register(req: Request, res: Response) {
        try {
            const { name, email, password, confirmPassword } = req.body;

            // Check if user already exists
            const existingUser = await UserRepository.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash password
            const hashedPassword = await AuthService.hashPassword(password);

            // Create new user
            const newUser = await UserRepository.create({
                email,
                password: hashedPassword
            });

            // Generate tokens
            const accessToken = AuthService.generateAccessToken(newUser);
            const refreshToken = AuthService.generateRefreshToken(newUser);

            // Store refresh token
            await UserRepository.updateRefreshToken(newUser.id, refreshToken);

            res.status(201).json({
                accessToken,
                refreshToken,
                user: {
                    id: newUser.id,
                    email: newUser.email
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error during registration' });
        }
    }

    // Logout
    static async logout(req: Request, res: Response) {
        try {
            const userId = req.user?.id; 

            // Remove refresh token from database
            await UserRepository.clearRefreshToken(userId);

            res.json({ message: 'Logged out successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error during logout' });
        }
    }
}

export default AuthController;