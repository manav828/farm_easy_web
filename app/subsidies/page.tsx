import {
  Search,
  Award,
  Users,
  Banknote,
  Calendar,
  ExternalLink,
  Bookmark,
  Bell,
  Globe,
  Tractor,
  Wheat,
  Droplets,
  Cog as Cow,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const subsidyCategories = [
  { name: "Crop Subsidy", icon: Wheat, color: "bg-green-100 text-green-700", count: 45 },
  { name: "Machinery", icon: Tractor, color: "bg-blue-100 text-blue-700", count: 28 },
  { name: "Irrigation", icon: Droplets, color: "bg-cyan-100 text-cyan-700", count: 22 },
  { name: "Dairy/Animal", icon: Cow, color: "bg-orange-100 text-orange-700", count: 18 },
]

const featuredSubsidies = [
  {
    id: 1,
    title: "PM-Kisan Samman Nidhi Yojana",
    category: "Direct Benefit",
    description: "Direct income support to farmer families across the country",
    benefit: "₹6,000 yearly",
    eligibility: "Small & marginal farmers",
    deadline: "Ongoing",
    icon: Banknote,
    color: "bg-green-500",
    popular: true,
  },
  {
    id: 2,
    title: "Tractor Purchase Subsidy",
    category: "Machinery",
    description: "Get up to 50% subsidy on new tractor purchases",
    benefit: "Up to ₹1,50,000",
    eligibility: "Small & medium farmers",
    deadline: "March 31, 2024",
    icon: Tractor,
    color: "bg-blue-500",
    popular: false,
  },
  {
    id: 3,
    title: "Drip Irrigation Subsidy",
    category: "Irrigation",
    description: "Subsidy for micro irrigation systems and water conservation",
    benefit: "Up to 90% subsidy",
    eligibility: "All farmers",
    deadline: "June 30, 2024",
    icon: Droplets,
    color: "bg-cyan-500",
    popular: true,
  },
  {
    id: 4,
    title: "Organic Farming Promotion",
    category: "Crop Subsidy",
    description: "Support for organic farming practices and certification",
    benefit: "₹50,000 per hectare",
    eligibility: "Certified organic farmers",
    deadline: "December 31, 2024",
    icon: Wheat,
    color: "bg-green-600",
    popular: false,
  },
]

const successStories = [
  {
    name: "Ramesh Patel",
    location: "Gujarat",
    scheme: "PM-Kisan",
    story: "Received ₹18,000 in 3 installments. Used the money to buy quality seeds and improved my crop yield by 30%.",
    image: "RP",
  },
  {
    name: "Sunita Devi",
    location: "Bihar",
    scheme: "Tractor Subsidy",
    story: "Got 40% subsidy on my new tractor. Now I can cultivate more land and help other farmers too.",
    image: "SD",
  },
]

export default function SubsidiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-white to-orange-50/30">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary rounded-lg p-2">
                <Award className="h-6 w-6 text-primary-foreground" />
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
              <Link href="/subsidies" className="text-primary font-medium">
                Subsidies
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

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-white to-orange-500/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Government Subsidies
              <span className="text-primary"> Made Simple</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Explore all agricultural schemes in one place. Apply easily and get benefits faster with our comprehensive
              guide.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search subsidies... (e.g., tractor subsidy, PM-Kisan)"
                  className="pl-12 pr-32 py-6 text-lg rounded-full border-2 border-border focus:border-primary shadow-lg bg-white/80 backdrop-blur-sm"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-8 shadow-md">
                  Search
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-green-100">
                <div className="text-3xl font-bold text-primary">113+</div>
                <div className="text-sm text-muted-foreground font-medium">Active Schemes</div>
              </div>
              <div className="text-center bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-green-100">
                <div className="text-3xl font-bold text-primary">₹2.5L Cr</div>
                <div className="text-sm text-muted-foreground font-medium">Total Benefits</div>
              </div>
              <div className="text-center bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-green-100">
                <div className="text-3xl font-bold text-primary">12M+</div>
                <div className="text-sm text-muted-foreground font-medium">Beneficiaries</div>
              </div>
              <div className="text-center bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-green-100">
                <div className="text-3xl font-bold text-primary">28</div>
                <div className="text-sm text-muted-foreground font-medium">States Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-12 bg-white/50 backdrop-blur-sm border-y border-green-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {subsidyCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Button
                  key={category.name}
                  variant="outline"
                  className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-green-200 hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <IconComponent className="h-4 w-4" />
                  {category.name}
                  <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                    {category.count}
                  </Badge>
                </Button>
              )
            })}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Subsidies */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Subsidies</h2>
            <p className="text-muted-foreground text-lg">Most popular schemes with high success rates</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredSubsidies.map((subsidy) => {
              const IconComponent = subsidy.icon
              return (
                <Card
                  key={subsidy.id}
                  className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-2 border-green-100 hover:border-primary/30 hover:shadow-2xl transition-all duration-500"
                >
                  {subsidy.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-orange-500 text-white shadow-lg">🔥 Popular</Badge>
                    </div>
                  )}

                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-16 h-16 rounded-2xl ${subsidy.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {subsidy.title}
                        </CardTitle>
                        <Badge variant="outline" className="border-green-200 text-green-700 mb-3">
                          {subsidy.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{subsidy.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Banknote className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-foreground">{subsidy.benefit}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-muted-foreground">{subsidy.eligibility}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-orange-600" />
                        <span className="text-sm text-muted-foreground">Deadline: {subsidy.deadline}</span>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button className="flex-1 bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Apply Now
                      </Button>
                      <Button variant="outline" size="sm" className="bg-white/50 backdrop-blur-sm">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Success Stories */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Success Stories</h2>
            <p className="text-muted-foreground text-lg">Real farmers sharing their subsidy experiences</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {successStories.map((story, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-white to-green-50/50 border-2 border-green-100 shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                      {story.image}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{story.name}</h3>
                      <p className="text-sm text-muted-foreground">{story.location}</p>
                      <Badge variant="outline" className="mt-1 border-green-200 text-green-700 text-xs">
                        {story.scheme}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed italic">"{story.story}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Additional Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-green-100 text-center">
            <CardContent className="p-8">
              <Bell className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">Get Notifications</h3>
              <p className="text-muted-foreground mb-6">Stay updated about new subsidies in your state</p>
              <Button variant="outline" className="bg-white/50 backdrop-blur-sm">
                Enable Alerts
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-2 border-green-100 text-center">
            <CardContent className="p-8">
              <Globe className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">Multilingual</h3>
              <p className="text-muted-foreground mb-6">Available in Hindi, English, and regional languages</p>
              <Button variant="outline" className="bg-white/50 backdrop-blur-sm">
                Change Language
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-2 border-green-100 text-center">
            <CardContent className="p-8">
              <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">Expert Help</h3>
              <p className="text-muted-foreground mb-6">Get assistance with application process</p>
              <Button variant="outline" className="bg-white/50 backdrop-blur-sm">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
