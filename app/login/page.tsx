"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, User, ShoppingCart, Shield } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (role: string) => {
    setLoading(true)

    // Dummy login - simulate authentication
    setTimeout(() => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: "1",
          name: role === "farmer" ? "Rajesh Kumar" : role === "buyer" ? "Priya Sharma" : "Admin User",
          email: email || `${role}@example.com`,
          role: role,
          avatar: "/placeholder.svg?height=40&width=40",
        }),
      )

      // Redirect based on role
      if (role === "farmer") {
        router.push("/seller/dashboard")
      } else if (role === "buyer") {
        router.push("/buyer/dashboard")
      } else if (role === "admin") {
        router.push("/admin/dashboard")
      }

      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="h-8 w-8 text-primary mr-2" />
            <span className="text-2xl font-bold text-primary">Farm-Easy</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Choose your role to continue</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Access your Farm-Easy account</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="farmer" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="farmer" className="text-xs">
                  <User className="h-4 w-4 mr-1" />
                  Farmer
                </TabsTrigger>
                <TabsTrigger value="buyer" className="text-xs">
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Buyer
                </TabsTrigger>
                <TabsTrigger value="admin" className="text-xs">
                  <Shield className="h-4 w-4 mr-1" />
                  Admin
                </TabsTrigger>
              </TabsList>

              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <TabsContent value="farmer" className="mt-0">
                <Button
                  onClick={() => handleLogin("farmer")}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in as Farmer"}
                </Button>
                <p className="text-xs text-gray-500 mt-2 text-center">Demo: farmer@example.com / password123</p>
              </TabsContent>

              <TabsContent value="buyer" className="mt-0">
                <Button
                  onClick={() => handleLogin("buyer")}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in as Buyer"}
                </Button>
                <p className="text-xs text-gray-500 mt-2 text-center">Demo: buyer@example.com / password123</p>
              </TabsContent>

              <TabsContent value="admin" className="mt-0">
                <Button
                  onClick={() => handleLogin("admin")}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in as Admin"}
                </Button>
                <p className="text-xs text-gray-500 mt-2 text-center">Demo: admin@example.com / admin123</p>
              </TabsContent>
            </Tabs>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
