const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const DatabaseConnection = require('./config/connection');
// Import routes
// const authRoutes = require('./routes/authRoutes'); 

class Server {
    constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT || '3000', 10);

        // Get database connection instance
        this.database = DatabaseConnection.getInstance();

        // Initialize middleware and routes
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    initializeMiddlewares() {
        // Security middleware
        this.app.use(helmet());

        // CORS configuration
        this.app.use(cors({
            origin: process.env.CORS_ORIGIN || '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    initializeRoutes() {
        // Base route
        this.app.get('/', (req, res) => {
            res.json({
                message: 'Welcome to the wellness api',
                status: 'healthy'
            });
        });

        // Mount route groups
        // this.app.use('/api/auth', authRoutes);
    }

    async start() {
        try {
            // Connect to the database before starting the server
            await this.database.connect();

            // Start the server
            this.app.listen(this.port, () => {
                console.log(`Server running on port ${this.port}`);
                console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
            });
        } catch (error) {
            console.error('Failed to start server:', error);
            process.exit(1);
        }
    }
}

// Create and start the server
const server = new Server();
server.start();
