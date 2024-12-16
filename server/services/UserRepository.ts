import mongoose, { Schema, Document, Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IUser extends Document {
    id: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    refreshToken?: string;
    isActive: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
}

// User Schema
const UserSchema: Schema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    refreshToken: {
        type: String,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for full name
UserSchema.virtual('fullName').get(function (this: IUser) {
    return `${this.firstName || ''} ${this.lastName || ''}`.trim();
});

// Indexes for performance
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ id: 1 }, { unique: true });

// Static methods
UserSchema.statics.findByEmail = function (email: string) {
    return this.findOne({ email: email.toLowerCase() });
};

// model
const UserModel = mongoose.model<IUser>('User', UserSchema);

// Repository class
class UserRepository {
    private model: Model<IUser>;

    constructor() {
        this.model = UserModel;
    }

    // Find user by email
    async findByEmail(email: string) {
        return this.model.findOne({
            email: email.toLowerCase()
        });
    }

    // Find user by ID
    async findById(id: string) {
        return this.model.findOne({ id });
    }

    // Create a new user
    async create(userData: {
        email: string,
        password: string,
        firstName?: string,
        lastName?: string
    }) {
        return this.model.create({
            email: userData.email,
            password: userData.password,
            firstName: userData.firstName,
            lastName: userData.lastName
        });
    }

    // Update refresh token
    async updateRefreshToken(userId: string, refreshToken: string) {
        return this.model.findOneAndUpdate(
            { id: userId },
            {
                refreshToken,
                updatedAt: new Date()
            },
            { new: true }
        );
    }

    // Clear refresh token (logout)
    async clearRefreshToken(userId: string) {
        return this.model.findOneAndUpdate(
            { id: userId },
            {
                refreshToken: null,
                updatedAt: new Date()
            },
            { new: true }
        );
    }

    // Update last login
    async updateLastLogin(userId: string) {
        return this.model.findOneAndUpdate(
            { id: userId },
            {
                lastLogin: new Date(),
                updatedAt: new Date()
            },
            { new: true }
        );
    }

    // Soft delete / deactivate user
    async deactivateUser(userId: string) {
        return this.model.findOneAndUpdate(
            { id: userId },
            {
                isActive: false,
                updatedAt: new Date()
            },
            { new: true }
        );
    }

    // Additional utility methods
    async existsByEmail(email: string): Promise<boolean> {
        const user = await this.model.findOne({
            email: email.toLowerCase()
        });
        return !!user;
    }
}

export default new UserRepository();