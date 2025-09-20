// Authentication utilities for Farm-Easy Marketplace
// Ready for JWT implementation with MongoDB user storage

import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { DatabaseService } from "./database"
import type { User } from "./types"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

export interface AuthUser {
  _id: string
  name: string
  email: string
  role: "farmer" | "buyer" | "admin"
}

export class AuthService {
  // Generate JWT token
  static generateToken(user: AuthUser): string {
    return jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    )
  }

  // Verify JWT token
  static verifyToken(token: string): AuthUser | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any
      return {
        _id: decoded.userId,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
      }
    } catch (error) {
      return null
    }
  }

  // Hash password
  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12)
  }

  // Verify password
  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword)
  }

  // Register new user
  static async register(userData: {
    name: string
    email: string
    phone: string
    password: string
    role: "farmer" | "buyer"
    location: {
      state: string
      district: string
      village?: string
      pincode: string
    }
  }): Promise<{ user: User; token: string }> {
    // TODO: Check if user already exists
    // const existingUser = await DatabaseService.getUserByEmail(userData.email)

    const hashedPassword = await this.hashPassword(userData.password)

    const newUser = await DatabaseService.createUser({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: userData.role,
      location: userData.location,
      profile: {},
      verification: {
        phoneVerified: false,
        emailVerified: false,
        documentVerified: false,
      },
      lastActive: new Date().toISOString(),
    })

    const token = this.generateToken({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    })

    return { user: newUser, token }
  }

  // Login user
  static async login(email: string, password: string): Promise<{ user: User; token: string } | null> {
    // TODO: Implement user lookup by email
    // const user = await DatabaseService.getUserByEmail(email)
    // if (!user || !await this.verifyPassword(password, user.password)) {
    //   return null
    // }

    // For development, return dummy user
    const dummyUser: User = {
      _id: "1",
      name: "Test User",
      email: email,
      phone: "+91-9876543210",
      role: "farmer",
      location: {
        state: "Punjab",
        district: "Amritsar",
        pincode: "143001",
      },
      profile: {},
      verification: {
        phoneVerified: true,
        emailVerified: true,
        documentVerified: true,
      },
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
    }

    const token = this.generateToken({
      _id: dummyUser._id,
      name: dummyUser.name,
      email: dummyUser.email,
      role: dummyUser.role,
    })

    return { user: dummyUser, token }
  }
}
