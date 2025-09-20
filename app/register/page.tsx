"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Leaf, User, ShoppingCart } from "lucide-react"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    description: "",
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async (role: string) => {
    setLoading(true)

    // Dummy registration - simulate account creation
    setTimeout(() => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: Date.now().toString(),
          name: formData.name || `New ${role}`,
          email: formData.email || `${role}@example.com`,
          role: role,
          phone: formData.phone,
          location: formData.location,
          avatar: "/placeholder.svg?height=40&width=40",
        }),
      )

      // Redirect based on role
      if (role === "farmer") {
        router.push("/seller/dashboard")
      } else if (role === "buyer") {
        router.push("/buyer/dashboard")
      }

      setLoading(false)
    }, 1000)
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="h-8 w-8 text-primary mr-2" />
            <span className="text-2xl font-bold text-primary">Farm-Easy</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Join Farm-Easy</h1>
          <p className="text-gray-600 mt-2">Create your account to get started</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Choose your role and create account</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="farmer" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="farmer">
                  <User className="h-4 w-4 mr-1" />
                  Farmer
                </TabsTrigger>
                <TabsTrigger value="buyer">
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Buyer
                </TabsTrigger>
              </TabsList>

              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => updateFormData("password", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, State"
                      value={formData.location}
                      onChange={(e) => updateFormData("location", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <TabsContent value="farmer" className="mt-0">
                <div className="space-y-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="farm-description">Farm Description</Label>
                    <Textarea
                      id="farm-description"
                      placeholder="Tell us about your farm and what you grow..."
                      value={formData.description}
                      onChange={(e) => updateFormData("description", e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  onClick={() => handleRegister("farmer")}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Farmer Account"}
                </Button>
              </TabsContent>

              <TabsContent value="buyer" className="mt-0">
                <div className="space-y-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="buyer-description">About You</Label>
                    <Textarea
                      id="buyer-description"
                      placeholder="Tell us about your business or buying needs..."
                      value={formData.description}
                      onChange={(e) => updateFormData("description", e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  onClick={() => handleRegister("buyer")}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Buyer Account"}
                </Button>
              </TabsContent>
            </Tabs>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
