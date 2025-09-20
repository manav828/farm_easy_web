"use client"

import { useState, useMemo } from "react"
import { Search, Filter, MapPin, Star, Phone, MessageCircle, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { MobileHeader } from "@/components/ui/mobile-header"
import Link from "next/link"

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

const districts = {
  "All States": ["All Districts"],
  Punjab: ["All Districts", "Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda"],
  Maharashtra: ["All Districts", "Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  Haryana: ["All Districts", "Gurgaon", "Faridabad", "Panipat", "Ambala", "Karnal"],
  "Uttar Pradesh": ["All Districts", "Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut"],
  Gujarat: ["All Districts", "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
  Rajasthan: ["All Districts", "Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner"],
  "Madhya Pradesh": ["All Districts", "Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
  Karnataka: ["All Districts", "Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
  "Tamil Nadu": ["All Districts", "Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
}

const categories = ["All Categories", "Crops", "Seeds", "Fertilizers", "Tools", "Livestock", "Animals"]

// Dummy sellers data
const dummySellers = [
  {
    id: "1",
    name: "Ravi Kumar Singh",
    location: { district: "Amritsar", state: "Punjab" },
    phone: "+91 98765 43210",
    rating: 4.8,
    totalReviews: 156,
    verified: true,
    specialization: ["Crops", "Seeds"],
    experience: "15+ years",
    totalProducts: 24,
    responseTime: "< 2 hours",
    description: "Experienced organic farmer specializing in wheat, rice, and seasonal vegetables.",
  },
  {
    id: "2",
    name: "Priya Sharma",
    location: { district: "Ludhiana", state: "Punjab" },
    phone: "+91 98765 43211",
    rating: 4.6,
    totalReviews: 89,
    verified: true,
    specialization: ["Fertilizers", "Tools"],
    experience: "10+ years",
    totalProducts: 18,
    responseTime: "< 4 hours",
    description: "Specialist in organic fertilizers and modern farming tools.",
  },
  {
    id: "3",
    name: "Amit Patel",
    location: { district: "Ahmedabad", state: "Gujarat" },
    phone: "+91 98765 43212",
    rating: 4.9,
    totalReviews: 203,
    verified: true,
    specialization: ["Livestock", "Animals"],
    experience: "20+ years",
    totalProducts: 32,
    responseTime: "< 1 hour",
    description: "Leading livestock and dairy farming expert with premium cattle breeds.",
  },
  {
    id: "4",
    name: "Sunita Devi",
    location: { district: "Jaipur", state: "Rajasthan" },
    phone: "+91 98765 43213",
    rating: 4.7,
    totalReviews: 124,
    verified: false,
    specialization: ["Seeds", "Crops"],
    experience: "8+ years",
    totalProducts: 15,
    responseTime: "< 6 hours",
    description: "Organic seed producer and crop cultivation specialist.",
  },
  {
    id: "5",
    name: "Rajesh Kumar",
    location: { district: "Pune", state: "Maharashtra" },
    phone: "+91 98765 43214",
    rating: 4.5,
    totalReviews: 67,
    verified: true,
    specialization: ["Tools", "Fertilizers"],
    experience: "12+ years",
    totalProducts: 21,
    responseTime: "< 3 hours",
    description: "Modern farming equipment and fertilizer solutions provider.",
  },
]

export default function SellersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedState, setSelectedState] = useState("All States")
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sortBy, setSortBy] = useState("rating")

  const availableDistricts = districts[selectedState as keyof typeof districts] || ["All Districts"]

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const filteredSellers = useMemo(() => {
    const filtered = dummySellers.filter((seller) => {
      // Search query filter
      if (searchQuery && !seller.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // State filter
      if (selectedState !== "All States" && seller.location.state !== selectedState) {
        return false
      }

      // District filter
      if (selectedDistrict !== "All Districts" && seller.location.district !== selectedDistrict) {
        return false
      }

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.some((cat) => seller.specialization.includes(cat))) {
        return false
      }

      // Verified filter
      if (verifiedOnly && !seller.verified) {
        return false
      }

      return true
    })

    // Sort sellers
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "reviews":
        filtered.sort((a, b) => b.totalReviews - a.totalReviews)
        break
      case "products":
        filtered.sort((a, b) => b.totalProducts - a.totalProducts)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }

    return filtered
  }, [searchQuery, selectedState, selectedDistrict, selectedCategories, verifiedOnly, sortBy])

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Location Filters */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Location</h3>
        <div className="space-y-3">
          <Select
            value={selectedState}
            onValueChange={(value) => {
              setSelectedState(value)
              setSelectedDistrict("All Districts")
            }}
          >
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

          <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
            <SelectTrigger className="bg-white/50 backdrop-blur-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {availableDistricts.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Category Filters */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Specialization</h3>
        <div className="space-y-3">
          {categories.slice(1).map((category) => (
            <div
              key={category}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/30 transition-colors"
            >
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
              />
              <label htmlFor={category} className="text-sm font-medium text-foreground cursor-pointer flex-1">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Verification Filter */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Verification</h3>
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
          <Checkbox id="verified" checked={verifiedOnly} onCheckedChange={setVerifiedOnly} />
          <label htmlFor="verified" className="text-sm font-medium text-foreground cursor-pointer flex-1">
            Verified Sellers Only
          </label>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-white to-orange-50/30">
      <MobileHeader currentPage="sellers" />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Sellers" }]} />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">Find Trusted Sellers</h1>

          {/* Search Bar */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search sellers by name..."
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

          {/* Sort Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48 bg-white/80 backdrop-blur-sm border-2 border-green-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                  <SelectItem value="products">Most Products</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground font-medium">{filteredSellers.length} sellers found</span>
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

          {/* Sellers Grid */}
          <div className="flex-1">
            {filteredSellers.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-8xl mb-6">👨‍🌾</div>
                <h3 className="text-2xl font-bold text-foreground mb-3">No sellers found</h3>
                <p className="text-muted-foreground text-lg">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredSellers.map((seller) => (
                  <Link key={seller.id} href={`/seller/${seller.id}`}>
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group bg-white/80 backdrop-blur-sm border-2 border-green-100 hover:border-primary/30">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            <Avatar className="h-16 w-16 border-2 border-white shadow-lg">
                              <AvatarFallback className="text-lg bg-gradient-to-br from-primary to-orange-500 text-white font-bold">
                                {seller.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {seller.verified && (
                              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                <Award className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                                  {seller.name}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <MapPin className="h-4 w-4" />
                                  <span>
                                    {seller.location.district}, {seller.location.state}
                                  </span>
                                </div>
                              </div>
                              {seller.verified && <Badge className="bg-green-600 text-white text-xs">Verified</Badge>}
                            </div>

                            <div className="flex items-center gap-4 mb-3">
                              <div className="flex items-center gap-1">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${i < Math.floor(seller.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                    />
                                  ))}
                                </div>
                                <span className="font-bold text-sm">{seller.rating}</span>
                                <span className="text-xs text-muted-foreground">({seller.totalReviews})</span>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Users className="h-3 w-3" />
                                <span>{seller.experience}</span>
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{seller.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {seller.specialization.map((spec) => (
                                <Badge key={spec} variant="outline" className="text-xs border-green-200 text-green-700">
                                  {spec}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>{seller.totalProducts} Products</span>
                                <span>Response: {seller.responseTime}</span>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  className="px-3 bg-primary text-primary-foreground hover:bg-primary/90"
                                >
                                  <Phone className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  className="px-3 bg-primary text-primary-foreground hover:bg-primary/90"
                                >
                                  <MessageCircle className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
