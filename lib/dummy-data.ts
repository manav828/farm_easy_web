// Dummy data for the Farm-Easy marketplace
// This structure is designed to easily integrate with MongoDB later

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
  status: "active" | "sold" | "expired"
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

// Dummy data
export const dummyProducts: Product[] = [
  {
    _id: "1",
    name: "Organic Basmati Rice",
    description:
      "Premium quality organic basmati rice, aged for 2 years. Grown without pesticides in the fertile fields of Punjab.",
    price: 85,
    unit: "kg",
    category: "Crops",
    subcategory: "Rice",
    images: ["/organic-basmati-rice-in-burlap-sack.jpg", "/basmati-rice-grains-close-up.jpg"],
    seller: {
      _id: "seller1",
      name: "Rajesh Kumar",
      phone: "+91-9876543210",
      location: {
        state: "Punjab",
        district: "Amritsar",
        village: "Khanna",
      },
      rating: 4.8,
      totalSales: 156,
    },
    availability: {
      quantity: 500,
      harvestDate: "2024-11-15",
    },
    quality: {
      grade: "A",
      organic: true,
      certified: true,
    },
    location: {
      state: "Punjab",
      district: "Amritsar",
      pincode: "143001",
    },
    createdAt: "2024-12-01T10:00:00Z",
    updatedAt: "2024-12-01T10:00:00Z",
    status: "active",
    views: 245,
    inquiries: 12,
  },
  {
    _id: "2",
    name: "Fresh Tomatoes",
    description:
      "Farm-fresh tomatoes, harvested daily. Perfect for cooking and salads. Rich in vitamins and antioxidants.",
    price: 40,
    unit: "kg",
    category: "Vegetables",
    subcategory: "Tomatoes",
    images: ["/fresh-red-tomatoes-in-wooden-crate.jpg", "/tomato-plants-in-greenhouse.jpg"],
    seller: {
      _id: "seller2",
      name: "Priya Sharma",
      phone: "+91-9876543211",
      location: {
        state: "Maharashtra",
        district: "Pune",
        village: "Baramati",
      },
      rating: 4.6,
      totalSales: 89,
    },
    availability: {
      quantity: 200,
      harvestDate: "2024-12-15",
      expiryDate: "2024-12-25",
    },
    quality: {
      grade: "A",
      organic: false,
      certified: false,
    },
    location: {
      state: "Maharashtra",
      district: "Pune",
      pincode: "413102",
    },
    createdAt: "2024-12-10T08:00:00Z",
    updatedAt: "2024-12-10T08:00:00Z",
    status: "active",
    views: 189,
    inquiries: 8,
  },
  {
    _id: "3",
    name: "Premium Wheat Seeds",
    description:
      "High-yield wheat seeds, disease-resistant variety. Perfect for winter sowing. Guaranteed germination rate of 95%.",
    price: 120,
    unit: "kg",
    category: "Seeds",
    subcategory: "Wheat Seeds",
    images: ["/wheat-seeds-in-farmer-hands.jpg", "/wheat-field-golden-harvest.jpg"],
    seller: {
      _id: "seller3",
      name: "Amit Singh",
      phone: "+91-9876543212",
      location: {
        state: "Haryana",
        district: "Karnal",
        village: "Taraori",
      },
      rating: 4.9,
      totalSales: 234,
    },
    availability: {
      quantity: 1000,
      harvestDate: "2024-10-20",
    },
    quality: {
      grade: "A",
      organic: false,
      certified: true,
    },
    location: {
      state: "Haryana",
      district: "Karnal",
      pincode: "132116",
    },
    createdAt: "2024-11-15T12:00:00Z",
    updatedAt: "2024-11-15T12:00:00Z",
    status: "active",
    views: 567,
    inquiries: 23,
  },
  {
    _id: "4",
    name: "Healthy Dairy Cow",
    description:
      "High-quality Holstein Friesian dairy cow, 3 years old. Excellent milk production capacity of 25-30 liters per day.",
    price: 45000,
    unit: "piece",
    category: "Animals",
    subcategory: "Cattle",
    images: ["/holstein-dairy-cow-in-pasture.jpg", "/cow-milking-process.jpg"],
    seller: {
      _id: "seller4",
      name: "Suresh Patel",
      phone: "+91-9876543213",
      location: {
        state: "Gujarat",
        district: "Anand",
        village: "Mogri",
      },
      rating: 4.7,
      totalSales: 45,
    },
    availability: {
      quantity: 5,
      harvestDate: "2024-01-15",
    },
    quality: {
      grade: "A",
      organic: false,
      certified: true,
    },
    location: {
      state: "Gujarat",
      district: "Anand",
      pincode: "388345",
    },
    createdAt: "2024-12-05T09:00:00Z",
    updatedAt: "2024-12-05T09:00:00Z",
    status: "active",
    views: 123,
    inquiries: 15,
  },
  {
    _id: "5",
    name: "Free Range Chickens",
    description:
      "Healthy free-range chickens, 6 months old. Perfect for egg production or meat. Vaccinated and disease-free.",
    price: 350,
    unit: "piece",
    category: "Animals",
    subcategory: "Poultry",
    images: ["/free-range-chickens-in-farm.jpg", "/chicken-coop-setup.jpg"],
    seller: {
      _id: "seller5",
      name: "Meera Devi",
      phone: "+91-9876543214",
      location: {
        state: "Uttar Pradesh",
        district: "Lucknow",
        village: "Malihabad",
      },
      rating: 4.5,
      totalSales: 78,
    },
    availability: {
      quantity: 50,
      harvestDate: "2024-06-01",
    },
    quality: {
      grade: "A",
      organic: true,
      certified: false,
    },
    location: {
      state: "Uttar Pradesh",
      district: "Lucknow",
      pincode: "226102",
    },
    createdAt: "2024-12-08T11:00:00Z",
    updatedAt: "2024-12-08T11:00:00Z",
    status: "active",
    views: 234,
    inquiries: 18,
  },
]

export const dummyUsers: User[] = [
  {
    _id: "seller1",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91-9876543210",
    role: "farmer",
    location: {
      state: "Punjab",
      district: "Amritsar",
      village: "Khanna",
      pincode: "143001",
    },
    profile: {
      bio: "Third-generation farmer specializing in organic rice cultivation",
      farmSize: 25,
      experience: 15,
    },
    verification: {
      phoneVerified: true,
      emailVerified: true,
      documentVerified: true,
    },
    createdAt: "2024-01-15T10:00:00Z",
    lastActive: "2024-12-15T14:30:00Z",
  },
  {
    _id: "seller4",
    name: "Suresh Patel",
    email: "suresh.patel@email.com",
    phone: "+91-9876543213",
    role: "farmer",
    location: {
      state: "Gujarat",
      district: "Anand",
      village: "Mogri",
      pincode: "388345",
    },
    profile: {
      bio: "Experienced dairy farmer with a focus on organic practices",
      farmSize: 50,
      experience: 10,
    },
    verification: {
      phoneVerified: true,
      emailVerified: true,
      documentVerified: true,
    },
    createdAt: "2024-02-20T11:00:00Z",
    lastActive: "2024-12-05T10:00:00Z",
  },
  {
    _id: "seller5",
    name: "Meera Devi",
    email: "meera.devi@email.com",
    phone: "+91-9876543214",
    role: "farmer",
    location: {
      state: "Uttar Pradesh",
      district: "Lucknow",
      village: "Malihabad",
      pincode: "226102",
    },
    profile: {
      bio: "Specializes in raising free-range chickens for both eggs and meat",
      farmSize: 30,
      experience: 8,
    },
    verification: {
      phoneVerified: true,
      emailVerified: true,
      documentVerified: true,
    },
    createdAt: "2024-03-10T09:00:00Z",
    lastActive: "2024-12-08T10:00:00Z",
  },
]

export const dummyCategories: Category[] = [
  {
    _id: "cat1",
    name: "Crops",
    slug: "crops",
    description: "Fresh crops and grains from verified farmers",
    icon: "Wheat",
    subcategories: ["Rice", "Wheat", "Corn", "Barley", "Pulses"],
    productCount: 2450,
  },
  {
    _id: "cat2",
    name: "Vegetables",
    slug: "vegetables",
    description: "Fresh vegetables directly from farms",
    icon: "Carrot",
    subcategories: ["Tomatoes", "Onions", "Potatoes", "Leafy Greens", "Peppers"],
    productCount: 1890,
  },
  {
    _id: "cat3",
    name: "Seeds",
    slug: "seeds",
    description: "High-quality seeds for better harvest",
    icon: "Sprout",
    subcategories: ["Vegetable Seeds", "Grain Seeds", "Flower Seeds", "Herb Seeds"],
    productCount: 890,
  },
  {
    _id: "cat4",
    name: "Fertilizers",
    slug: "fertilizers",
    description: "Organic and chemical fertilizers",
    icon: "Leaf",
    subcategories: ["Organic Fertilizers", "Chemical Fertilizers", "Bio-fertilizers"],
    productCount: 340,
  },
  {
    _id: "cat5",
    name: "Tools",
    slug: "tools",
    description: "Farming tools and equipment",
    icon: "Tractor",
    subcategories: ["Hand Tools", "Power Tools", "Irrigation", "Harvesting"],
    productCount: 560,
  },
  {
    _id: "cat6",
    name: "Animals",
    slug: "animals",
    description: "Healthy livestock and farm animals",
    icon: "Heart",
    subcategories: ["Cattle", "Poultry", "Goats", "Sheep", "Dairy Cows"],
    productCount: 320,
  },
]

// Database connection placeholder - ready for MongoDB integration
export class DatabaseService {
  // This class structure is ready for MongoDB integration
  // Just replace these methods with actual MongoDB operations

  static async getProducts(filters?: any): Promise<Product[]> {
    // TODO: Replace with MongoDB query
    return dummyProducts.filter((product) => {
      if (filters?.category && product.category !== filters.category) return false
      if (filters?.state && product.location.state !== filters.state) return false
      if (filters?.minPrice && product.price < filters.minPrice) return false
      if (filters?.maxPrice && product.price > filters.maxPrice) return false
      return true
    })
  }

  static async getProductById(id: string): Promise<Product | null> {
    // TODO: Replace with MongoDB findById
    return dummyProducts.find((p) => p._id === id) || null
  }

  static async createProduct(product: Omit<Product, "_id" | "createdAt" | "updatedAt">): Promise<Product> {
    // TODO: Replace with MongoDB insert
    const newProduct: Product = {
      ...product,
      _id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    return newProduct
  }

  static async getCategories(): Promise<Category[]> {
    // TODO: Replace with MongoDB query
    return dummyCategories
  }

  static async getUserById(id: string): Promise<User | null> {
    // TODO: Replace with MongoDB findById
    return dummyUsers.find((u) => u._id === id) || null
  }
}
