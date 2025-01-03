const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

class DatabaseConnection {
    static instance;

    constructor() {
        if (DatabaseConnection.instance) {
            return DatabaseConnection.instance;
        }

        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MongoDB connection string is not defined in environment variables');
        }

        this.mongoUri = uri;
        DatabaseConnection.instance = this;
    }

    static getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }

    async connect() {
        try {
            await mongoose.connect(this.mongoUri);

            mongoose.connection.on('connected', () => {
                console.log('✅ Successfully connected to MongoDB');
            });

            mongoose.connection.on('error', (err) => {
                console.error('❌ MongoDB connection error:', err);
            });

            mongoose.connection.on('disconnected', () => {
                console.log('🚫 MongoDB disconnected');
            });
        } catch (error) {
            console.error('❌ Failed to connect to MongoDB:', error);
            process.exit(1);
        }
    }

    async disconnect() {
        await mongoose.disconnect();
        console.log('MongoDB disconnected');
    }
}

module.exports = DatabaseConnection;
