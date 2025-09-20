import { Search, Leaf, Wheat, Tractor, Sprout, Heart, MapPin, ArrowRight, TrendingUp, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MobileHeader } from "@/components/ui/mobile-header"

// Dummy data for featured products
const featuredProducts = [
  {
    id: 1,
    name: "Organic Basmati Rice",
    price: "₹85/kg",
    image: "/organic-basmati-rice-in-burlap-sack.jpg",
    seller: "Rajesh Kumar",
    location: "Punjab",
    category: "Grains",
  },
  {
    id: 2,
    name: "Fresh Tomatoes",
    price: "₹40/kg",
    image: "/fresh-red-tomatoes-in-wooden-crate.jpg",
    seller: "Priya Sharma",
    location: "Maharashtra",
    category: "Vegetables",
  },
  {
    id: 3,
    name: "Premium Wheat Seeds",
    price: "₹120/kg",
    image: "/wheat-seeds-in-farmer-hands.jpg",
    seller: "Amit Singh",
    location: "Haryana",
    category: "Seeds",
  },
  {
    id: 4,
    name: "Organic Fertilizer",
    price: "₹350/bag",
    image: "/organic-fertilizer-bag-in-farm-setting.jpg",
    seller: "Green Earth Co.",
    location: "Gujarat",
    category: "Fertilizers",
  },
]

// Category data
const categories = [
  {
    name: "Crops",
    icon: Wheat,
    gradient: "from-emerald-400 to-green-600",
    bgPattern: "bg-gradient-to-br from-emerald-50 to-green-100",
    count: "2,450+",
    description: "Fresh harvest from verified farms",
    trending: true,
    growth: "+12%",
  },
  {
    name: "Seeds",
    icon: Sprout,
    gradient: "from-amber-400 to-orange-600",
    bgPattern: "bg-gradient-to-br from-amber-50 to-orange-100",
    count: "890+",
    description: "Premium quality seeds for better yield",
    trending: false,
    growth: "+8%",
  },
  {
    name: "Fertilizers",
    icon: Leaf,
    gradient: "from-blue-400 to-indigo-600",
    bgPattern: "bg-gradient-to-br from-blue-50 to-indigo-100",
    count: "340+",
    description: "Organic & chemical fertilizers",
    trending: true,
    growth: "+15%",
  },
  {
    name: "Tools",
    icon: Tractor,
    gradient: "from-purple-400 to-violet-600",
    bgPattern: "bg-gradient-to-br from-purple-50 to-violet-100",
    count: "560+",
    description: "Modern farming equipment & tools",
    trending: false,
    growth: "+5%",
  },
  {
    name: "Animals",
    icon: Heart,
    gradient: "from-pink-400 to-rose-600",
    bgPattern: "bg-gradient-to-br from-pink-50 to-rose-100",
    count: "320+",
    description: "Healthy livestock & farm animals",
    trending: true,
    growth: "+18%",
  },
  {
    name: "Land",
    icon: MapPin,
    gradient: "from-yellow-400 to-amber-600",
    bgPattern: "bg-gradient-to-br from-yellow-50 to-amber-100",
    count: "95+",
    description: "Agricultural land for lease & sale",
    trending: false,
    growth: "+3%",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <MobileHeader currentPage="home" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Connecting Farmers to Markets,
              <span className="text-primary"> Digitally</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Empowering Indian farmers to sell directly to buyers. Fresh produce, fair prices, sustainable farming for
              a better tomorrow.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search for crops, seeds, fertilizers, tools..."
                  className="pl-12 pr-4 md:pr-32 py-4 md:py-6 text-base md:text-lg rounded-full border-2 border-border focus:border-primary shadow-lg"
                />
                <Button className="hidden md:block absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-8 shadow-md">
                  Search
                </Button>
              </div>
              <Button className="md:hidden w-full mt-3 rounded-full shadow-md">Search</Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
              <div className="text-center bg-white/50 rounded-lg p-3 md:p-4 backdrop-blur">
                <div className="text-2xl md:text-3xl font-bold text-primary">5,000+</div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">Active Farmers</div>
              </div>
              <div className="text-center bg-white/50 rounded-lg p-3 md:p-4 backdrop-blur">
                <div className="text-2xl md:text-3xl font-bold text-primary">15,000+</div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">Products Listed</div>
              </div>
              <div className="text-center bg-white/50 rounded-lg p-3 md:p-4 backdrop-blur">
                <div className="text-2xl md:text-3xl font-bold text-primary">2,500+</div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">Happy Buyers</div>
              </div>
              <div className="text-center bg-white/50 rounded-lg p-3 md:p-4 backdrop-blur">
                <div className="text-2xl md:text-3xl font-bold text-primary">28</div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">States Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.1),transparent_50%)] pointer-events-none" />

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm border border-primary/20">
              <Star className="h-4 w-4" />
              Explore Categories
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Discover Your Perfect
              <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent"> Match</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto text-pretty">
              From premium seeds to cutting-edge farming tools - find everything you need to grow your agricultural
              business
            </p>
          </div>

          {/* Modern Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {categories.map((category, index) => {
              const IconComponent = category.icon
              const isLarge = index === 0 // Only make first card larger

              return (
                <Link
                  key={category.name}
                  href={`/products?category=${category.name.toLowerCase()}`}
                  className={`group ${isLarge ? "md:col-span-2 lg:col-span-1" : ""}`}
                >
                  <Card
                    className={`relative overflow-hidden bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer transform hover:-translate-y-2 hover:rotate-1 ${isLarge ? "min-h-[360px]" : "min-h-[320px]"}`}
                  >
                    {/* Gradient background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}
                    />

                    {/* Pattern overlay */}
                    <div className={`absolute inset-0 ${category.bgPattern} opacity-30`} />

                    {/* Trending badge */}
                    {category.trending && (
                      <div className="absolute top-4 right-4 z-20">
                        <div className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                          <TrendingUp className="h-3 w-3" />
                          HOT
                        </div>
                      </div>
                    )}

                    <CardContent className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between">
                      <div>
                        {/* Icon with modern styling */}
                        <div className="relative mb-6">
                          <div
                            className={`w-16 h-16 md:w-20 md:h-20 ${isLarge ? "md:w-24 md:h-24" : ""} rounded-3xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 shadow-2xl`}
                          >
                            <IconComponent
                              className={`h-8 w-8 md:h-10 md:w-10 ${isLarge ? "md:h-12 md:w-12" : ""} text-white`}
                            />
                          </div>

                          {/* Floating elements */}
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center group-hover:scale-125 transition-transform duration-500">
                            <span className="text-xs font-bold text-primary">{index + 1}</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="text-center">
                          <h3
                            className={`font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 ${isLarge ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}`}
                          >
                            {category.name}
                          </h3>

                          <p
                            className={`text-muted-foreground mb-4 ${isLarge ? "text-base md:text-lg" : "text-sm md:text-base"}`}
                          >
                            {category.description}
                          </p>

                          {/* Stats */}
                          <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="text-center">
                              <div
                                className={`font-bold text-primary ${isLarge ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}`}
                              >
                                {category.count}
                              </div>
                              <div className="text-xs text-muted-foreground">Products</div>
                            </div>
                            <div className="w-px h-8 bg-border" />
                            <div className="text-center">
                              <div
                                className={`font-bold text-green-600 ${isLarge ? "text-lg md:text-xl" : "text-base md:text-lg"}`}
                              >
                                {category.growth}
                              </div>
                              <div className="text-xs text-muted-foreground">Growth</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-auto">
                        <div className="flex items-center justify-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all duration-300">
                          <span className={isLarge ? "text-base md:text-lg" : "text-sm md:text-base"}>Explore Now</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </CardContent>

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl -z-10" />
                  </Card>
                </Link>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-xl border border-primary/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-muted-foreground">🚀 New arrivals daily</span>
              </div>
              <div className="w-px h-6 bg-border" />
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-muted-foreground">⚡ Fast delivery nationwide</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Products</h2>
            <p className="text-muted-foreground text-lg">Fresh from our verified farmers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-primary/20">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-green-500 text-white shadow-md">Fresh</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold text-primary mb-3">{product.price}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{product.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">by {product.seller}</span>
                      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-shadow"
              >
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Selling?</h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90">
            Join thousands of farmers already earning better prices
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button size="lg" variant="secondary" className="flex-1">
              List Your Products
            </Button>
            <Link href="/subsidies">
              <Button
                size="lg"
                variant="outline"
                className="w-full bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                View Subsidies
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-primary rounded-lg p-2">
                  <Leaf className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Farm-Easy</span>
              </div>
              <p className="text-muted-foreground">
                Connecting farmers to markets, digitally. Empowering Indian agriculture through technology.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-primary transition-colors">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/sell" className="hover:text-primary transition-colors">
                    Start Selling
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-primary transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/farmer-guide" className="hover:text-primary transition-colors">
                    Farmer Guide
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Contact Info</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>📞 1800-FARM-EASY</p>
                <p>📧 support@farm-easy.in</p>
                <p>📍 New Delhi, India</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Farm-Easy. All rights reserved. Made with ❤️ for Indian farmers.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
