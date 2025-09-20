// Database Service for Farm-Easy Marketplace
// This service provides a clean abstraction layer for database operations
// Simply uncomment MongoDB imports and add connection string to use with real database

import type { Product, User, Category } from "./types"

// Uncomment these imports when ready to use MongoDB:
// import { MongoClient, type Db, type Collection } from "mongodb"

class DatabaseConnection {
  private static instance: DatabaseConnection
  private isConnected = false

  private constructor() {}

  static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection()
    }
    return DatabaseConnection.instance
  }

  async connect(): Promise<void> {
    if (this.isConnected) return

    console.log("Using dummy data (MongoDB integration ready)")
    this.isConnected = true

    // TODO: Uncomment when ready to use MongoDB
    /*
    const connectionString = process.env.MONGODB_URI || "mongodb://localhost:27017/farm-easy"
    
    try {
      this.client = new MongoClient(connectionString)
      await this.client.connect()
      this.db = this.client.db("farm-easy")
      console.log("Connected to MongoDB")
    } catch (error) {
      console.error("MongoDB connection error:", error)
      console.log("Using dummy data fallback")
    }
    */
  }

  isReady(): boolean {
    return this.isConnected
  }
}

export class DatabaseService {
  private static db = DatabaseConnection.getInstance()

  // Initialize database connection
  static async init(): Promise<void> {
    await this.db.connect()
  }

  // Products
  static async getProducts(
    filters: {
      category?: string
      state?: string
      minPrice?: number
      maxPrice?: number
      search?: string
      limit?: number
      skip?: number
    } = {},
  ): Promise<Product[]> {
    const { dummyProducts } = await import("./dummy-data")
    return dummyProducts
      .filter((product) => {
        if (filters.category && product.category !== filters.category) return false
        if (filters.state && product.location.state !== filters.state) return false
        if (filters.minPrice && product.price < filters.minPrice) return false
        if (filters.maxPrice && product.price > filters.maxPrice) return false
        if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) return false
        return true
      })
      .slice(filters.skip || 0, (filters.skip || 0) + (filters.limit || 50))
  }

  static async getProductById(id: string): Promise<Product | null> {
    const { dummyProducts } = await import("./dummy-data")
    return dummyProducts.find((p) => p._id === id) || null
  }

  static async createProduct(product: Omit<Product, "_id" | "createdAt" | "updatedAt">): Promise<Product> {
    const newProduct: Product = {
      ...product,
      _id: new Date().getTime().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    console.log("Created product (dummy mode):", newProduct.name)
    return newProduct
  }

  static async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    console.log("Updated product (dummy mode):", id)
    return null
  }

  static async getProductsBySeller(sellerId: string): Promise<Product[]> {
    const { dummyProducts } = await import("./dummy-data")
    return dummyProducts.filter((product) => product.sellerId === sellerId)
  }

  // Users
  static async getUserById(id: string): Promise<User | null> {
    const { dummyUsers } = await import("./dummy-data")
    return dummyUsers.find((u) => u._id === id) || null
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const { dummyUsers } = await import("./dummy-data")
    return dummyUsers.find((u) => u.email === email) || null
  }

  static async createUser(user: Omit<User, "_id" | "createdAt">): Promise<User> {
    const newUser: User = {
      ...user,
      _id: new Date().getTime().toString(),
      createdAt: new Date().toISOString(),
    }

    console.log("Created user (dummy mode):", newUser.name)
    return newUser
  }

  static async authenticateUser(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email)
    if (user && user.password === password) {
      return user
    }
    return null
  }

  // Categories
  static async getCategories(): Promise<Category[]> {
    const { dummyCategories } = await import("./dummy-data")
    return dummyCategories
  }

  // Analytics
  static async getAnalytics(): Promise<any> {
    return {
      totalProducts: 2450,
      totalUsers: 1250,
      totalSales: 45000,
      monthlyRevenue: 125000,
      topCategories: ["Crops", "Vegetables", "Seeds"],
      recentActivity: [
        { type: "product_added", user: "Rajesh Kumar", time: "2 hours ago" },
        { type: "order_placed", user: "Priya Sharma", time: "4 hours ago" },
        { type: "user_registered", user: "Amit Singh", time: "6 hours ago" },
      ],
    }
  }
}

// Initialize database connection on module load
DatabaseService.init().catch(console.error)
