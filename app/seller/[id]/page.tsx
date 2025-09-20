import { MapPin, Star, Phone, MessageCircle, Calendar, Award, TrendingUp, Users, Package, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import Link from "next/link"
import { DatabaseService } from "@/lib/database"

interface SellerProfilePageProps {
  params: {
    id: string
  }
}

export default async function SellerProfilePage({ params }: SellerProfilePageProps) {
  // Get seller data (using dummy data for now)
  const seller = {
    id: params.id,
    name: "Ravi Kumar Singh",
    location: { village: "Khanna", district: "Amritsar", state: "Punjab" },
    phone: "+91 98765 43210",
    rating: 4.8,
    totalReviews: 156,
    totalSales: 342,
    memberSince: "2019-03-15",
    verified: true,
    specialization: ["Wheat", "Rice", "Seasonal Vegetables"],
    farmSize: "25 acres",
    experience: "15+ years",
    description:
      "Experienced organic farmer specializing in wheat, rice, and seasonal vegetables. Using sustainable farming practices for over 15 years with focus on quality and customer satisfaction.",
    achievements: [
      "Best Organic Farmer 2023 - Punjab Agricultural Board",
      "Sustainable Farming Excellence Award 2022",
      "Top Seller on Farm-Easy for 3 consecutive years",
    ],
    stats: {
      totalProducts: 24,
      activeListings: 12,
      completedOrders: 342,
      responseTime: "< 2 hours",
    },
  }

  const products = await DatabaseService.getProductsBySeller(params.id)
  const reviews = [
    {
      id: 1,
      buyer: "Amit Sharma",
      rating: 5,
      comment: "Excellent quality wheat! Fresh and exactly as described. Will definitely order again.",
      date: "2024-01-15",
      product: "Premium Organic Wheat",
    },
    {
      id: 2,
      buyer: "Priya Patel",
      rating: 5,
      comment: "Best tomatoes I've bought online. Ravi ji is very professional and responsive.",
      date: "2024-01-10",
      product: "Fresh Tomatoes",
    },
    {
      id: 3,
      buyer: "Rajesh Kumar",
      rating: 4,
      comment: "Good quality rice, delivered on time. Packaging was excellent.",
      date: "2024-01-05",
      product: "Basmati Rice Premium",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-white to-orange-50/30">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary rounded-lg p-2">
                <Leaf className="h-6 w-6 text-primary-foreground" />
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
              <Link href="/sellers" className="text-muted-foreground hover:text-primary transition-colors">
                Sellers
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                Login
              </Button>
              <Button size="sm">Register</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Sellers", href: "/sellers" }, { label: seller.name }]}
        />

        {/* Profile Header */}
        <Card className="mb-8 overflow-hidden bg-gradient-to-br from-white to-green-50/50 border-2 border-green-100">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 flex-1">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                    <AvatarFallback className="text-3xl bg-gradient-to-br from-primary to-orange-500 text-white font-bold">
                      {seller.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {seller.verified && (
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                    <h1 className="text-3xl font-bold text-foreground">{seller.name}</h1>
                    <Badge className="bg-green-600 text-white w-fit mx-auto sm:mx-0">Verified Farmer</Badge>
                  </div>

                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span className="text-muted-foreground font-medium">
                      {seller.location.village}, {seller.location.district}, {seller.location.state}
                    </span>
                  </div>

                  <div className="flex items-center justify-center sm:justify-start gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < Math.floor(seller.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="font-bold text-xl">{seller.rating}</span>
                      <span className="text-muted-foreground">({seller.totalReviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Member since {new Date(seller.memberSince).getFullYear()}
                      </span>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">{seller.description}</p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      {seller.phone}
                    </Button>
                    <Button size="lg" variant="outline" className="bg-white/50 backdrop-blur-sm">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:w-64">
                <Card className="bg-white/70 backdrop-blur-sm border-green-200">
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{seller.stats.completedOrders}</div>
                    <div className="text-sm text-muted-foreground">Completed Orders</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/70 backdrop-blur-sm border-green-200">
                  <CardContent className="p-4 text-center">
                    <Package className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{seller.stats.activeListings}</div>
                    <div className="text-sm text-muted-foreground">Active Products</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-96 mx-auto bg-white/70 backdrop-blur-sm border border-green-200">
            <TabsTrigger value="about" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              About
            </TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Products ({seller.stats.activeListings})
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Reviews ({seller.totalReviews})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Farm Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Farm Size</span>
                    <span className="font-medium">{seller.farmSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Experience</span>
                    <span className="font-medium">{seller.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response Time</span>
                    <span className="font-medium text-green-600">{seller.stats.responseTime}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Specialization</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {seller.specialization.map((spec) => (
                        <Badge key={spec} variant="outline" className="border-green-200 text-green-700">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-orange-500" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {seller.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0, 6).map((product) => (
                  <Link key={product._id} href={`/products/${product._id}`}>
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group bg-white/70 backdrop-blur-sm border-green-200">
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <img
                          src={product.images[0] || "/placeholder.svg?height=200&width=300&query=farm product"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-green-500 text-white shadow-md">
                            {product.quality.organic ? "Organic" : "Fresh"}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-2xl font-bold text-primary mb-3">
                          ₹{product.price}/{product.unit}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                            Grade {product.quality.grade}
                          </Badge>
                          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No products available</h3>
                <p className="text-muted-foreground">This seller hasn't listed any products yet.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id} className="bg-white/70 backdrop-blur-sm border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary font-medium">
                            {review.buyer
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-foreground">{review.buyer}</h4>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                        {review.product}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
