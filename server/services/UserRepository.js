const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// User Schema
const UserSchema = new mongoose.Schema({
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
UserSchema.virtual('fullName').get(function () {
    return `${this.firstName || ''} ${this.lastName || ''}`.trim();
});

// Indexes for performance
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ id: 1 }, { unique: true });

// Static methods
UserSchema.statics.findByEmail = function (email) {
    return this.findOne({ email: email.toLowerCase() });
};

// model
const UserModel = mongoose.model('User', UserSchema);

// Repository class
class UserRepository {
    constructor() {
        this.model = UserModel;
    }

    // Find user by email
    async findByEmail(email) {
        return this.model.findOne({
            email: email.toLowerCase()
        });
    }

    // Find user by ID
    async findById(id) {
        return this.model.findOne({ id });
    }

    // Create a new user
    async create(userData) {
        return this.model.create({
            email: userData.email,
            password: userData.password,
            firstName: userData.firstName,
            lastName: userData.lastName
        });
    }

    // Update refresh token
    async updateRefreshToken(userId, refreshToken) {
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
    async clearRefreshToken(userId) {
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
    async updateLastLogin(userId) {
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
    async deactivateUser(userId) {
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
    async existsByEmail(email) {
        const user = await this.model.findOne({
            email: email.toLowerCase()
        });
        return !!user;
    }
}

// Export an instance of the repository
module.exports = new UserRepository();