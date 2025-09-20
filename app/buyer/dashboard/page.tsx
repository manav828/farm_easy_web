"use client"

import { useState } from "react"
import {
  Heart,
  MessageCircle,
  ShoppingBag,
  MapPin,
  Phone,
  Calendar,
  Package,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { dummyProducts, type Product } from "@/lib/dummy-data"

// Mock buyer data
const buyerData = {
  _id: "buyer1",
  name: "Amit Sharma",
  email: "amit.sharma@email.com",
  phone: "+91-9876543220",
  location: {
    state: "Delhi",
    district: "New Delhi",
    pincode: "110001",
  },
  joinedDate: "2024-03-10",
  totalOrders: 24,
  totalSpent: 45000,
}

// Mock wishlist data
const wishlistItems = [
  {
    ...dummyProducts[0],
    addedDate: "2024-12-10",
  },
  {
    ...dummyProducts[1],
    addedDate: "2024-12-08",
  },
  {
    ...dummyProducts[2],
    addedDate: "2024-12-05",
  },
]

// Mock inquiry data
const myInquiries = [
  {
    id: "1",
    productId: "1",
    productName: "Organic Basmati Rice",
    sellerName: "Rajesh Kumar",
    sellerPhone: "+91-9876543210",
    message: "Interested in bulk purchase. Can you provide 500kg? What's your best price?",
    date: "2024-12-15",
    status: "responded",
    sellerResponse: "Yes, we can provide 500kg. Best price would be ₹80/kg for bulk order.",
    responseDate: "2024-12-15",
  },
  {
    id: "2",
    productId: "2",
    productName: "Fresh Tomatoes",
    sellerName: "Priya Sharma",
    sellerPhone: "+91-9876543211",
    message: "What's the minimum order quantity? Can you deliver to Delhi?",
    date: "2024-12-14",
    status: "pending",
  },
  {
    id: "3",
    productId: "3",
    productName: "Premium Wheat Seeds",
    sellerName: "Amit Singh",
    sellerPhone: "+91-9876543212",
    message: "Are these seeds suitable for Delhi climate? What's the germination rate?",
    date: "2024-12-12",
    status: "responded",
    sellerResponse: "Yes, these seeds are perfect for Delhi climate. Germination rate is 95%.",
    responseDate: "2024-12-13",
  },
]

// Mock order history
const orderHistory = [
  {
    id: "ORD001",
    productName: "Organic Wheat",
    sellerName: "Ravi Patel",
    quantity: "100 kg",
    totalAmount: 8500,
    orderDate: "2024-12-01",
    status: "delivered",
    deliveryDate: "2024-12-05",
  },
  {
    id: "ORD002",
    productName: "Fresh Onions",
    sellerName: "Sunita Devi",
    quantity: "50 kg",
    totalAmount: 1500,
    orderDate: "2024-11-28",
    status: "delivered",
    deliveryDate: "2024-12-02",
  },
  {
    id: "ORD003",
    productName: "Organic Fertilizer",
    sellerName: "Green Earth Co.",
    quantity: "2 bags",
    totalAmount: 700,
    orderDate: "2024-11-25",
    status: "in-transit",
    expectedDelivery: "2024-12-18",
  },
]

export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const WishlistCard = ({ product }: { product: Product & { addedDate: string } }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
            <img
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                <Heart className="h-4 w-4 fill-current" />
              </Button>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-lg font-bold text-primary">
                ₹{product.price}/{product.unit}
              </span>
              <Badge variant="outline">{product.category}</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <MapPin className="h-3 w-3" />
              <span>
                {product.location.district}, {product.location.state}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                Added {new Date(product.addedDate).toLocaleDateString()}
              </span>
              <div className="flex gap-2">
                <Button size="sm" asChild>
                  <Link href={`/products/${product._id}`}>View</Link>
                </Button>
                <Button size="sm" variant="outline">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Contact
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-transit":
        return <Package className="h-4 w-4 text-blue-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "in-transit":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary rounded-lg p-2">
                <ShoppingBag className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">Farm-Easy</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                Products
              </Link>
              <Link href="/buyer/dashboard" className="text-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  {buyerData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:block font-medium">{buyerData.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {buyerData.name}!</h1>
          <p className="text-muted-foreground">Track your orders, manage wishlists, and discover fresh products</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{buyerData.totalOrders}</div>
                  <p className="text-xs text-muted-foreground">3 this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{buyerData.totalSpent.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">₹10,700 this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{wishlistItems.length}</div>
                  <p className="text-xs text-muted-foreground">2 added this week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Inquiries</CardTitle>
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{myInquiries.filter((i) => i.status === "pending").length}</div>
                  <p className="text-xs text-muted-foreground">1 pending response</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orderHistory.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      {getStatusIcon(order.status)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{order.productName}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.quantity} • ₹{order.totalAmount.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.status === "delivered"
                            ? `Delivered on ${new Date(order.deliveryDate!).toLocaleDateString()}`
                            : order.status === "in-transit"
                              ? `Expected: ${new Date(order.expectedDelivery!).toLocaleDateString()}`
                              : `Ordered on ${new Date(order.orderDate).toLocaleDateString()}`}
                        </p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/buyer/orders">View All Orders</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Order delivered: Organic Wheat</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Seller responded to your inquiry</p>
                      <p className="text-xs text-muted-foreground">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Added Premium Wheat Seeds to wishlist</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New inquiry sent to Priya Sharma</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">My Wishlist</h2>
              <Badge variant="secondary">{wishlistItems.length} items</Badge>
            </div>

            {wishlistItems.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Your wishlist is empty</h3>
                <p className="text-muted-foreground mb-4">Start adding products you're interested in</p>
                <Button asChild>
                  <Link href="/products">Browse Products</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wishlistItems.map((product) => (
                  <WishlistCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Inquiries Tab */}
          <TabsContent value="inquiries" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">My Inquiries</h2>
              <Badge variant="secondary">{myInquiries.filter((i) => i.status === "pending").length} pending</Badge>
            </div>

            <div className="space-y-4">
              {myInquiries.map((inquiry) => (
                <Card key={inquiry.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{inquiry.productName}</h3>
                        <p className="text-muted-foreground">
                          Seller: {inquiry.sellerName} • {inquiry.sellerPhone}
                        </p>
                      </div>
                      <Badge variant={inquiry.status === "pending" ? "destructive" : "default"}>{inquiry.status}</Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm font-medium mb-1">Your Message:</p>
                        <p className="text-sm">{inquiry.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Sent on {new Date(inquiry.date).toLocaleDateString()}
                        </p>
                      </div>

                      {inquiry.sellerResponse && (
                        <div className="bg-primary/5 p-4 rounded-lg">
                          <p className="text-sm font-medium mb-1">Seller Response:</p>
                          <p className="text-sm">{inquiry.sellerResponse}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Responded on {new Date(inquiry.responseDate!).toLocaleDateString()}
                          </p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4 mr-2" />
                          Call Seller
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          WhatsApp
                        </Button>
                        <Button size="sm" asChild>
                          <Link href={`/products/${inquiry.productId}`}>View Product</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="text-2xl">
                        {buyerData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{buyerData.name}</h3>
                      <p className="text-muted-foreground">Verified Buyer</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <p className="text-foreground">{buyerData.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Phone</label>
                      <p className="text-foreground">{buyerData.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Location</label>
                      <p className="text-foreground flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {buyerData.location.district}, {buyerData.location.state} - {buyerData.location.pincode}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                      <p className="text-foreground flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(buyerData.joinedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <Button className="w-full">Edit Profile</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Purchase Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">{buyerData.totalOrders}</div>
                      <div className="text-sm text-muted-foreground">Total Orders</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">₹{buyerData.totalSpent.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Total Spent</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">{wishlistItems.length}</div>
                      <div className="text-sm text-muted-foreground">Wishlist Items</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">4.9</div>
                      <div className="text-sm text-muted-foreground">Avg. Rating Given</div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-medium">Favorite Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Grains</Badge>
                      <Badge variant="secondary">Vegetables</Badge>
                      <Badge variant="secondary">Seeds</Badge>
                      <Badge variant="secondary">Fertilizers</Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Preferred Locations</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Punjab</Badge>
                      <Badge variant="outline">Haryana</Badge>
                      <Badge variant="outline">Maharashtra</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
