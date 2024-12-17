const express = require("express");
const UserRepository = require("../../services/UserRepository");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Registration route
    this.router.post("/register", this.registerUser.bind(this));

    // Login route
    this.router.post("/login", this.loginUser.bind(this));

    // Logout route (requires authentication middleware)
    this.router.post(
      "/logout",
      this.authenticateToken.bind(this),
      this.logoutUser.bind(this)
    );

    // Get user profile route (requires authentication middleware)
    this.router.get(
      "/profile",
      this.authenticateToken.bind(this),
      this.getUserProfile.bind(this)
    );
  }

  // User Registration
  async registerUser(req, res) {
    try {
      const { email, password, firstName, lastName } = req.body;

      // Validate input
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      // Check if user already exists
      const existingUser = await UserRepository.existsByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create user
      const newUser = await UserRepository.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });

      // Generate access and refresh tokens
      const accessToken = this.generateAccessToken(newUser.id);
      const refreshToken = this.generateRefreshToken(newUser.id);

      // Update user with refresh token
      await UserRepository.updateRefreshToken(newUser.id, refreshToken);

      res.status(201).json({
        message: "User registered successfully",
        userId: newUser.id,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Registration failed" });
    }
  }

  // User Login
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await UserRepository.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(403).json({ message: "User account is deactivated" });
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate tokens
      const accessToken = this.generateAccessToken(user.id);
      const refreshToken = this.generateRefreshToken(user.id);

      // Update refresh token and last login
      await UserRepository.updateRefreshToken(user.id, refreshToken);
      await UserRepository.updateLastLogin(user.id);

      res.status(200).json({
        message: "Login successful",
        userId: user.id,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  }

  // Logout
  async logoutUser(req, res) {
    try {
      const userId = req.user.id;

      // Clear refresh token
      await UserRepository.clearRefreshToken(userId);

      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ message: "Logout failed" });
    }
  }

  // Get User Profile
  async getUserProfile(req, res) {
    try {
      const userId = req.user.id;

      const user = await UserRepository.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Exclude sensitive information
      const { password, refreshToken, ...userProfile } = user.toObject
        ? user.toObject()
        : user;

      res.status(200).json(userProfile);
    } catch (error) {
      console.error("Profile retrieval error:", error);
      res.status(500).json({ message: "Failed to retrieve profile" });
    }
  }

  // JWT Token Generation
  generateAccessToken(userId) {
    return jwt.sign(
      { id: userId },
      process.env.JWT_SECRET || "jwt_secret",
      {
        expiresIn: "15m", // 15 minutes
      }
    );
  }

  generateRefreshToken(userId) {
    return jwt.sign(
      { id: userId },
      process.env.JWT_REFRESH_SECRET || "jwt_refresh_secret",
      {
        expiresIn: "7d", // 7 days
      }
    );
  }

  // Authentication Middleware
  authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "jwt_secret"
      );
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
  }
}

const authRoutes = new AuthRoutes();
module.exports = exports = authRoutes.router;
