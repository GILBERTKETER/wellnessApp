import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import UserRepository from '../services/UserRepository';

// Helper to standardize response initialization
const initializeResponse = (res: Response) => {
    return (statusCode: number, status: 'success' | 'error', message: string, data: any = null) => {
        res.status(statusCode).json({
            status,
            message,
            data,
        });
    };
};

class AuthController {
    // User login method
    static async login(req: Request, res: Response) {
        const sendResponse = initializeResponse(res);
        try {
            const { email, password } = req.body;

            // Find user by email
            const user = await UserRepository.findByEmail(email);
            if (!user) {
                return sendResponse(401, 'error', 'Invalid credentials');
            }

            // Compare passwords
            const isPasswordValid = await AuthService.comparePassword(password, user.password);
            if (!isPasswordValid) {
                return sendResponse(401, 'error', 'Invalid credentials');
            }

            // Generate tokens
            const accessToken = AuthService.generateAccessToken(user);
            const refreshToken = AuthService.generateRefreshToken(user);

            // Store refresh token in database 
            await UserRepository.updateRefreshToken(user.id, refreshToken);

            sendResponse(200, 'success', 'Login successful', {
                accessToken,
                refreshToken,
                user: {
                    id: user.id,
                    email: user.email,
                },
            });
        } catch (error) {
            sendResponse(500, 'error', 'Server error during login');
        }
    }

    // Token refresh method
    static async refreshToken(req: Request, res: Response) {
        const sendResponse = initializeResponse(res);
        try {
            const { refreshToken } = req.body;

            // Verify refresh token
            const decoded = AuthService.verifyRefreshToken(refreshToken);
            if (!decoded) {
                return sendResponse(401, 'error', 'Invalid refresh token');
            }

            // Find user and validate stored refresh token
            const user = await UserRepository.findById(decoded.userId);
            if (!user || user.refreshToken !== refreshToken) {
                return sendResponse(401, 'error', 'Invalid refresh token');
            }

            // Generate new tokens
            const newAccessToken = AuthService.generateAccessToken(user);
            const newRefreshToken = AuthService.generateRefreshToken(user);

            // Update refresh token in database
            await UserRepository.updateRefreshToken(user.id, newRefreshToken);

            sendResponse(200, 'success', 'Token refreshed successfully', {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            });
        } catch (error) {
            sendResponse(500, 'error', 'Server error during token refresh');
        }
    }

    // User registration method
    static async register(req: Request, res: Response) {
        const sendResponse = initializeResponse(res);
        try {
            const { name, email, password, confirmPassword } = req.body;

            // Check if user already exists
            const existingUser = await UserRepository.findByEmail(email);
            if (existingUser) {
                return sendResponse(400, 'error', 'User already exists');
            }

            // Hash password
            const hashedPassword = await AuthService.hashPassword(password);

            // Create new user
            const newUser = await UserRepository.create({
                email,
                password: hashedPassword,
            });

            // Generate tokens
            const accessToken = AuthService.generateAccessToken(newUser);
            const refreshToken = AuthService.generateRefreshToken(newUser);

            // Store refresh token
            await UserRepository.updateRefreshToken(newUser.id, refreshToken);

            sendResponse(201, 'success', 'User registered successfully', {
                accessToken,
                refreshToken,
                user: {
                    id: newUser.id,
                    email: newUser.email,
                },
            });
        } catch (error) {
            sendResponse(500, 'error', 'Server error during registration');
        }
    }

    // Logout
    static async logout(req: Request, res: Response) {
        const sendResponse = initializeResponse(res);
        try {
            const userId = req.user?.id;

            // Remove refresh token from database
            await UserRepository.clearRefreshToken(userId);

            sendResponse(200, 'success', 'Logged out successfully');
        } catch (error) {
            sendResponse(500, 'error', 'Server error during logout');
        }
    }
}

export default AuthController;
