"use client"

import { useState, useMemo, useEffect } from "react"
import { Search, Filter, Grid, List, MapPin, Star, Heart, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { dummyProducts, dummyCategories, type Product } from "@/lib/dummy-data"
import { MobileHeader } from "@/components/ui/mobile-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { useSearchParams, useRouter } from "next/navigation"

const states = [
  "All States",
  "Punjab",
  "Maharashtra",
  "Haryana",
  "Uttar Pradesh",
  "Gujarat",
  "Rajasthan",
  "Madhya Pradesh",
  "Karnataka",
  "Tamil Nadu",
]

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedState, setSelectedState] = useState("All States")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortBy, setSortBy] = useState("latest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [organicOnly, setOrganicOnly] = useState(false)
  const [certifiedOnly, setCertifiedOnly] = useState(false)

  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      const formattedCategory = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)
      setSelectedCategory(formattedCategory)
    }
  }, [searchParams])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    const params = new URLSearchParams(searchParams.toString())
    if (category === "All Categories") {
      params.delete("category")
    } else {
      params.set("category", category.toLowerCase())
    }
    router.push(`/products?${params.toString()}`)
  }

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = dummyProducts.filter((product) => {
      // Search query filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Category filter
      if (selectedCategory !== "All Categories" && product.category !== selectedCategory) {
        return false
      }

      // State filter
      if (selectedState !== "All States" && product.location.state !== selectedState) {
        return false
      }

      // Price range filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false
      }

      // Organic filter
      if (organicOnly && !product.quality.organic) {
        return false
      }

      // Certified filter
      if (certifiedOnly && !product.quality.certified) {
        return false
      }

      return true
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.seller.rating - a.seller.rating)
        break
      case "latest":
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, selectedState, priceRange, sortBy, organicOnly, certifiedOnly])

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Categories</h3>
        <div className="space-y-2">
          <div
            className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedCategory === "All Categories"
                ? "bg-primary text-primary-foreground shadow-md"
                : "hover:bg-muted/50 border border-transparent hover:border-primary/20 text-foreground"
            }`}
            onClick={() => handleCategoryChange("All Categories")}
          >
            <span className="font-medium">All Categories</span>
          </div>
          {dummyCategories.map((category) => (
            <div
              key={category._id}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedCategory === category.name
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "hover:bg-muted/50 border border-transparent hover:border-primary/20 text-foreground"
              }`}
              onClick={() => handleCategoryChange(category.name)}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{category.name}</span>
                <Badge
                  className={`text-xs font-medium ${
                    selectedCategory === category.name
                      ? "bg-primary-foreground text-primary"
                      : "bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  {category.productCount}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Location */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Location</h3>
        <Select value={selectedState} onValueChange={setSelectedState}>
          <SelectTrigger className="bg-white/50 backdrop-blur-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {states.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Price Range</h3>
        <div className="px-2">
          <Slider value={priceRange} onValueChange={setPriceRange} max={1000} min={0} step={10} className="mb-4" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span className="font-medium">₹{priceRange[0]}</span>
            <span className="font-medium">₹{priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Quality Filters */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Quality</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
            <Checkbox id="organic" checked={organicOnly} onCheckedChange={setOrganicOnly} />
            <label htmlFor="organic" className="text-sm font-medium text-foreground cursor-pointer flex-1">
              Organic Only
            </label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
            <Checkbox id="certified" checked={certifiedOnly} onCheckedChange={setCertifiedOnly} />
            <label htmlFor="certified" className="text-sm font-medium text-foreground cursor-pointer flex-1">
              Certified Only
            </label>
          </div>
        </div>
      </div>
    </div>
  )

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group bg-white/80 backdrop-blur-sm border-2 border-green-100 hover:border-primary/30">
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/80 backdrop-blur-sm hover:bg-white">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        {product.quality.organic && (
          <Badge className="absolute top-3 left-3 bg-green-600 text-white shadow-lg">Organic</Badge>
        )}
      </div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-foreground text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">{product.category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{product.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-primary">₹{product.price}</span>
            <span className="text-sm text-muted-foreground">/{product.unit}</span>
          </div>
          <div className="text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
            Qty: {product.availability.quantity} {product.unit}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="font-medium">
            {product.location.district}, {product.location.state}
          </span>
        </div>

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="text-sm font-semibold text-foreground">{product.seller.name}</div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium text-muted-foreground">{product.seller.rating}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
            <Link href={`/products/${product._id}`}>View Details</Link>
          </Button>
          <Button size="sm" className="px-3 bg-primary text-primary-foreground hover:bg-primary/90">
            <Phone className="h-4 w-4" />
          </Button>
          <Button size="sm" className="px-3 bg-primary text-primary-foreground hover:bg-primary/90">
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const ProductListItem = ({ product }: { product: Product }) => (
    <Card className="hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-2 border-green-100 hover:border-primary/30">
      <CardContent className="p-5">
        <div className="flex gap-4">
          <div className="w-32 h-24 flex-shrink-0 overflow-hidden rounded-lg relative">
            <img
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.quality.organic && (
              <Badge className="absolute top-1 left-1 text-xs bg-green-600 text-white">Organic</Badge>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-foreground text-lg">{product.name}</h3>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800 border-green-200">{product.category}</Badge>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold text-primary">
                  ₹{product.price}/{product.unit}
                </span>
                <span className="text-sm text-muted-foreground">
                  Qty: {product.availability.quantity} {product.unit}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>
                  {product.location.district}, {product.location.state}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{product.seller.name}</span>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-muted-foreground">{product.seller.rating}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <Link href={`/products/${product._id}`}>View Details</Link>
                </Button>
                <Button size="sm" className="px-3 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button size="sm" className="px-3 bg-primary text-primary-foreground hover:bg-primary/90">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-white to-orange-50/30">
      <MobileHeader currentPage="products" />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Products" }]} />

        {/* Search and Filters Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">Browse Products</h1>

          {/* Search Bar */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/80 backdrop-blur-sm border-2 border-green-100 focus:border-primary"
              />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button className="md:hidden bg-primary text-primary-foreground hover:bg-primary/90">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-white/95 backdrop-blur-sm">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Sort and View Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48 bg-white/80 backdrop-blur-sm border-2 border-green-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground font-medium">
                {filteredProducts.length} products found
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white border-2 border-green-100 text-primary hover:bg-primary hover:text-primary-foreground"
                }
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white border-2 border-green-100 text-primary hover:bg-primary hover:text-primary-foreground"
                }
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-80 flex-shrink-0">
            <Card className="p-6 sticky top-24 bg-white/80 backdrop-blur-sm border-2 border-green-100 shadow-lg">
              <FilterSidebar />
            </Card>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-8xl mb-6">🌾</div>
                <h3 className="text-2xl font-bold text-foreground mb-3">No products found</h3>
                <p className="text-muted-foreground text-lg">Try adjusting your filters or search terms</p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProducts.map((product) => (
                  <ProductListItem key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
