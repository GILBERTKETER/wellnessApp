const express = require("express");
const UserRepository = require("../services/UserRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
 
//lets us 200 as default response code 
class AuthRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  // Default response structure
  createResponse({ message = "", code = 200, status = "success", data = null }) {
    return { message, code, status, data };
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

      if (!email || !password) {
        return res.json(
          this.createResponse({
            message: "Email and password are required",
            code: 400,
            status: "error",
          })
        );
      }

      const existingUser = await UserRepository.existsByEmail(email);
      if (existingUser) {
        return res.json(
          this.createResponse({
            message: "User already exists",
            code: 409,
            status: "error",
          })
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserRepository.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });

      const accessToken = this.generateAccessToken(newUser.id);
      const refreshToken = this.generateRefreshToken(newUser.id);
      await UserRepository.updateRefreshToken(newUser.id, refreshToken);

      res.json(
        this.createResponse({
          message: "User registered successfully",
          code: 201,
          status: "success",
          data: { userId: newUser.id, accessToken, refreshToken },
        })
      );
    } catch (error) {
      console.error("Registration error:", error);
      res.json(
        this.createResponse({
          message: "Registration failed",
          code: 500,
          status: "error",
        })
      );
    }
  }

  // User Login
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const user = await UserRepository.findByEmail(email);
      if (!user) {
        return res.json(
          this.createResponse({
            message: "Invalid credentials",
            code: 401,
            status: "error",
          })
        );
      }

      if (!user.isActive) {
        return res.json(
          this.createResponse({
            message: "User account is deactivated",
            code: 403,
            status: "error",
          })
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.json(
          this.createResponse({
            message: "Invalid credentials",
            code: 401,
            status: "error",
          })
        );
      }

      const accessToken = this.generateAccessToken(user.id);
      const refreshToken = this.generateRefreshToken(user.id);
      await UserRepository.updateRefreshToken(user.id, refreshToken);
      await UserRepository.updateLastLogin(user.id);

      res.json(
        this.createResponse({
          message: "Login successful",
          code: 200,
          status: "success",
          data: { userId: user.id, accessToken, refreshToken },
        })
      );
    } catch (error) {
      console.error("Login error:", error);
      res.json(
        this.createResponse({
          message: "Login failed",
          code: 500,
          status: "error",
        })
      );
    }
  }

  // Logout
  async logoutUser(req, res) {
    try {
      const userId = req.user.id;
      await UserRepository.clearRefreshToken(userId);

      res.json(
        this.createResponse({
          message: "Logout successful",
          code: 200,
          status: "success",
        })
      );
    } catch (error) {
      console.error("Logout error:", error);
      res.json(
        this.createResponse({
          message: "Logout failed",
          code: 500,
          status: "error",
        })
      );
    }
  }

  // Get User Profile
  async getUserProfile(req, res) {
    try {
      const userId = req.user.id;

      const user = await UserRepository.findById(userId);
      if (!user) {
        return res.json(
          this.createResponse({
            message: "User not found",
            code: 404,
            status: "error",
          })
        );
      }

      const { password, refreshToken, ...userProfile } = user.toObject
        ? user.toObject()
        : user;

      res.json(
        this.createResponse({
          message: "Profile retrieved successfully",
          code: 200,
          status: "success",
          data: userProfile,
        })
      );
    } catch (error) {
      console.error("Profile retrieval error:", error);
      res.json(
        this.createResponse({
          message: "Failed to retrieve profile",
          code: 500,
          status: "error",
        })
      );
    }
  }

  // JWT Token Generation
  generateAccessToken(userId) {
    return jwt.sign(
      { id: userId },
      process.env.JWT_SECRET || "jwt_secret",
      { expiresIn: "15m" }
    );
  }

  generateRefreshToken(userId) {
    return jwt.sign(
      { id: userId },
      process.env.JWT_REFRESH_SECRET || "jwt_refresh_secret",
      { expiresIn: "7d" }
    );
  }

  // Authentication Middleware
  authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.json(
        this.createResponse({
          message: "No token provided",
          code: 401,
          status: "error",
        })
      );
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "jwt_secret"
      );
      req.user = decoded;
      next();
    } catch (error) {
      return res.json(
        this.createResponse({
          message: "Invalid or expired token",
          code: 403,
          status: "error",
        })
      );
    }
  }
}

const authRoutes = new AuthRoutes();
module.exports = authRoutes.router;
