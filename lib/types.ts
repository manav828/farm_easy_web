// TypeScript interfaces for Farm-Easy Marketplace
// These types are designed to work seamlessly with MongoDB

export interface Product {
  _id: string
  name: string
  description: string
  price: number
  unit: string
  category: string
  subcategory: string
  images: string[]
  seller: {
    _id: string
    name: string
    phone: string
    location: {
      state: string
      district: string
      village: string
    }
    rating: number
    totalSales: number
  }
  availability: {
    quantity: number
    harvestDate: string
    expiryDate?: string
  }
  quality: {
    grade: "A" | "B" | "C"
    organic: boolean
    certified: boolean
  }
  location: {
    state: string
    district: string
    pincode: string
  }
  createdAt: string
  updatedAt: string
  status: "active" | "sold" | "expired" | "pending"
  views: number
  inquiries: number
}

export interface User {
  _id: string
  name: string
  email: string
  phone: string
  role: "farmer" | "buyer" | "admin"
  location: {
    state: string
    district: string
    village?: string
    pincode: string
  }
  profile: {
    avatar?: string
    bio?: string
    farmSize?: number // in acres
    experience?: number // in years
  }
  verification: {
    phoneVerified: boolean
    emailVerified: boolean
    documentVerified: boolean
  }
  createdAt: string
  lastActive: string
}

export interface Category {
  _id: string
  name: string
  slug: string
  description: string
  icon: string
  subcategories: string[]
  productCount: number
}

export interface Inquiry {
  _id: string
  productId: string
  buyerId: string
  sellerId: string
  message: string
  quantity: number
  priceOffered?: number
  status: "pending" | "responded" | "accepted" | "rejected"
  createdAt: string
  updatedAt: string
}

export interface Order {
  _id: string
  productId: string
  buyerId: string
  sellerId: string
  quantity: number
  totalPrice: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed"
  deliveryAddress: {
    name: string
    phone: string
    address: string
    pincode: string
  }
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
