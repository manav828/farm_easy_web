import { notFound } from "next/navigation"
import { MapPin, Star, Phone, MessageCircle, Heart, Share2, Shield, Truck, Calendar, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { DatabaseService } from "@/lib/dummy-data"
import { Breadcrumb } from "@/components/ui/breadcrumb"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await DatabaseService.getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
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
          items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: product.name }]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border">
              <img
                src={product.images[0] || "/placeholder.svg?height=400&width=400&query=farm product"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(1).map((image, index) => (
                  <div key={index} className="aspect-square overflow-hidden rounded border cursor-pointer">
                    <img
                      src={image || "/placeholder.svg?height=100&width=100&query=farm product"}
                      alt={`${product.name} ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">{product.category}</Badge>
                    {product.quality.organic && <Badge className="bg-green-600 text-white">Organic</Badge>}
                    {product.quality.certified && <Badge variant="outline">Certified</Badge>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="text-4xl font-bold text-primary mb-4">
                ₹{product.price}/{product.unit}
              </div>

              <p className="text-muted-foreground text-lg mb-6">{product.description}</p>

              {/* Key Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">Grade {product.quality.grade}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">
                    Available: {product.availability.quantity} {product.unit}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">
                    Harvested: {new Date(product.availability.harvestDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">
                    {product.location.district}, {product.location.state}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button size="lg" className="flex-1">
                  <Phone className="h-5 w-5 mr-2" />
                  Call Seller
                </Button>
                <Button size="lg" variant="outline" className="flex-1 bg-transparent">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seller Information */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden bg-gradient-to-br from-white to-green-50/30 border-2 border-green-100">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-orange-500/5 border-b border-green-100">
                <CardTitle className="flex items-center justify-between">
                  <span>Seller Information</span>
                  <Badge className="bg-green-600 text-white">Verified Farmer</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="relative">
                    <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                      <AvatarFallback className="text-xl bg-gradient-to-br from-primary to-orange-500 text-white font-bold">
                        {product.seller.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-2xl font-bold text-foreground">{product.seller.name}</h3>
                      <Link href={`/seller/${product.seller.id}`}>
                        <Button variant="outline" size="sm" className="bg-white/50 backdrop-blur-sm">
                          View Profile
                        </Button>
                      </Link>
                    </div>

                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(product.seller.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="font-semibold text-lg">{product.seller.rating}</span>
                        <span className="text-muted-foreground text-sm">(156 reviews)</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="font-medium">{product.seller.totalSales} successful sales</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4" />
                      <span className="font-medium">
                        {product.seller.location.village}, {product.seller.location.district},{" "}
                        {product.seller.location.state}
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                      Experienced organic farmer specializing in wheat, rice, and seasonal vegetables. Using sustainable
                      farming practices for over 15 years.
                    </p>

                    <div className="flex gap-3">
                      <Button className="flex-1 bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90">
                        <Phone className="h-4 w-4 mr-2" />
                        {product.seller.phone}
                      </Button>
                      <Button variant="outline" className="flex-1 bg-white/50 backdrop-blur-sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Category</span>
                    <p className="text-foreground">
                      {product.category} - {product.subcategory}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Quality Grade</span>
                    <p className="text-foreground">Grade {product.quality.grade}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Organic</span>
                    <p className="text-foreground">{product.quality.organic ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Certified</span>
                    <p className="text-foreground">{product.quality.certified ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Harvest Date</span>
                    <p className="text-foreground">{new Date(product.availability.harvestDate).toLocaleDateString()}</p>
                  </div>
                  {product.availability.expiryDate && (
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Best Before</span>
                      <p className="text-foreground">
                        {new Date(product.availability.expiryDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats and Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Views</span>
                  <span className="font-medium">{product.views}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Inquiries</span>
                  <span className="font-medium">{product.inquiries}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Listed</span>
                  <span className="font-medium">{new Date(product.createdAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Safety Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>• Always verify product quality before purchase</p>
                <p>• Meet in safe, public locations</p>
                <p>• Check seller ratings and reviews</p>
                <p>• Use secure payment methods</p>
                <p>• Report suspicious listings</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
