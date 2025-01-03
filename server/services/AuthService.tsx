import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

interface User {
    id: string;
    email: string;
    password: string;
}

interface TokenPayload {
    userId: string;
    email: string;
}

class AuthService {
    // Secret keys - in environment variables
    private static ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_token_secret';
    private static REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_token_secret';

    // Token generation methods
    static generateAccessToken(user: User): string {
        const payload: TokenPayload = {
            userId: user.id,
            email: user.email
        };

        return jwt.sign(payload, this.ACCESS_TOKEN_SECRET, {
            expiresIn: '15m' // Short-lived access token
        });
    }

    static generateRefreshToken(user: User): string {
        const payload: TokenPayload = {
            userId: user.id,
            email: user.email
        };

        return jwt.sign(payload, this.REFRESH_TOKEN_SECRET, {
            expiresIn: '7d' // Long-lived refresh token
        });
    }

    // Token verification methods
    static verifyAccessToken(token: string): TokenPayload | null {
        try {
            return jwt.verify(token, this.ACCESS_TOKEN_SECRET) as TokenPayload;
        } catch (error) {
            return null;
        }
    }

    static verifyRefreshToken(token: string): TokenPayload | null {
        try {
            return jwt.verify(token, this.REFRESH_TOKEN_SECRET) as TokenPayload;
        } catch (error) {
            return null;
        }
    }

    // Password-related methods
    static async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    static async comparePassword(
        plainPassword: string,
        hashedPassword: string
    ): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
}

export default AuthService;