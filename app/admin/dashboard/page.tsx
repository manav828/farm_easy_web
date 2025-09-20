"use client"

import { useState } from "react"
import {
  Users,
  Package,
  AlertTriangle,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Shield,
  UserCheck,
  UserX,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { dummyProducts, dummyUsers } from "@/lib/dummy-data"

// Mock admin data
const adminStats = {
  totalUsers: 12450,
  totalSellers: 5200,
  totalBuyers: 7250,
  totalProducts: 15680,
  activeProducts: 12340,
  pendingApprovals: 45,
  totalReports: 23,
  monthlyRevenue: 125000,
  monthlyGrowth: 12.5,
}

// Mock reports data
const reports = [
  {
    id: "RPT001",
    type: "product",
    reportedItem: "Fake Organic Rice",
    reportedBy: "Amit Sharma",
    reason: "Misleading organic certification",
    date: "2024-12-15",
    status: "pending",
    severity: "high",
  },
  {
    id: "RPT002",
    type: "seller",
    reportedItem: "Fake Seller Account",
    reportedBy: "Priya Singh",
    reason: "Suspicious seller behavior",
    date: "2024-12-14",
    status: "investigating",
    severity: "medium",
  },
  {
    id: "RPT003",
    type: "product",
    reportedItem: "Overpriced Seeds",
    reportedBy: "Ravi Patel",
    reason: "Price manipulation",
    date: "2024-12-13",
    status: "resolved",
    severity: "low",
  },
]

// Mock pending approvals
const pendingApprovals = [
  {
    id: "APP001",
    type: "seller",
    name: "New Farmer Registration",
    applicant: "Mohan Kumar",
    location: "Punjab",
    date: "2024-12-15",
    documents: ["Aadhaar", "Farm Certificate"],
  },
  {
    id: "APP002",
    type: "product",
    name: "Premium Basmati Rice",
    applicant: "Rajesh Singh",
    category: "Grains",
    date: "2024-12-14",
    price: "₹95/kg",
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [actionDialog, setActionDialog] = useState(false)
  const [actionType, setActionType] = useState("")
  const [actionReason, setActionReason] = useState("")

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800"
      case "investigating":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleUserAction = (user: any, action: string) => {
    setSelectedUser(user)
    setActionType(action)
    setActionDialog(true)
  }

  const executeAction = () => {
    // TODO: Implement actual user action (ban, suspend, verify, etc.)
    console.log(`${actionType} user:`, selectedUser, "Reason:", actionReason)
    setActionDialog(false)
    setActionReason("")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary rounded-lg p-2">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">Farm-Easy Admin</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/admin/dashboard" className="text-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link href="/admin/analytics" className="text-muted-foreground hover:text-primary transition-colors">
                Analytics
              </Link>
              <Link href="/admin/settings" className="text-muted-foreground hover:text-primary transition-colors">
                Settings
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <span className="hidden md:block font-medium">Admin</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, products, and platform operations</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminStats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {adminStats.totalSellers.toLocaleString()} sellers, {adminStats.totalBuyers.toLocaleString()} buyers
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminStats.totalProducts.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">{adminStats.activeProducts.toLocaleString()} active</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminStats.pendingApprovals + adminStats.totalReports}</div>
                  <p className="text-xs text-muted-foreground">
                    {adminStats.pendingApprovals} approvals, {adminStats.totalReports} reports
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{adminStats.monthlyRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+{adminStats.monthlyGrowth}% from last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Reports */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Reports</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {reports.slice(0, 3).map((report) => (
                    <div key={report.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{report.reportedItem}</p>
                        <p className="text-sm text-muted-foreground">
                          Reported by {report.reportedBy} • {new Date(report.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getSeverityColor(report.severity)}>{report.severity}</Badge>
                        <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent" onClick={() => setActiveTab("reports")}>
                    View All Reports
                  </Button>
                </CardContent>
              </Card>

              {/* Pending Approvals */}
              <Card>
                <CardHeader>
                  <CardTitle>Pending Approvals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingApprovals.map((approval) => (
                    <div key={approval.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{approval.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {approval.applicant} • {new Date(approval.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline">
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent" onClick={() => setActiveTab("approvals")}>
                    View All Approvals
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">User Management</h2>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="farmers">Farmers</SelectItem>
                    <SelectItem value="buyers">Buyers</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Search users..." className="w-64" />
              </div>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyUsers.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.role === "farmer" ? "default" : "secondary"}>{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        {user.location.district}, {user.location.state}
                      </TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            user.verification.phoneVerified && user.verification.emailVerified
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {user.verification.phoneVerified && user.verification.emailVerified ? "Verified" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUserAction(user, "verify")}>
                              <UserCheck className="h-4 w-4 mr-2" />
                              Verify User
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUserAction(user, "suspend")}>
                              <UserX className="h-4 w-4 mr-2" />
                              Suspend User
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleUserAction(user, "ban")}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Ban User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Product Management</h2>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Products</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending Review</SelectItem>
                    <SelectItem value="reported">Reported</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Search products..." className="w-64" />
              </div>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyProducts.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 overflow-hidden rounded">
                            <img
                              src={product.images[0] || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">ID: {product._id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.seller.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        ₹{product.price}/{product.unit}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            product.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Product
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Product
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove Product
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Reports & Issues</h2>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {reports.map((report) => (
                <Card key={report.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{report.reportedItem}</h3>
                        <p className="text-muted-foreground">
                          Reported by {report.reportedBy} • {new Date(report.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getSeverityColor(report.severity)}>{report.severity}</Badge>
                        <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                      </div>
                    </div>
                    <p className="text-sm mb-4">{report.reason}</p>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => setSelectedReport(report)}>
                        Investigate
                      </Button>
                      <Button size="sm" variant="outline">
                        Contact Reporter
                      </Button>
                      <Button size="sm" variant="outline">
                        Mark Resolved
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Approvals Tab */}
          <TabsContent value="approvals" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Pending Approvals</h2>
              <Badge variant="secondary">{pendingApprovals.length} pending</Badge>
            </div>

            <div className="space-y-4">
              {pendingApprovals.map((approval) => (
                <Card key={approval.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{approval.name}</h3>
                        <p className="text-muted-foreground">
                          {approval.applicant} • {new Date(approval.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>
                    </div>

                    {approval.type === "seller" && (
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-2">Documents submitted:</p>
                        <div className="flex gap-2">
                          {approval.documents?.map((doc) => (
                            <Badge key={doc} variant="outline">
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {approval.type === "product" && (
                      <div className="mb-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Category:</span>
                            <p>{approval.category}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Price:</span>
                            <p>{approval.price}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button size="sm">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline">
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                      <Button size="sm" variant="outline">
                        Request More Info
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* User Details Dialog */}
        {selectedUser && (
          <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>User Details - {selectedUser.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-xl">
                      {selectedUser.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                    <p className="text-muted-foreground">{selectedUser.email}</p>
                    <Badge variant={selectedUser.role === "farmer" ? "default" : "secondary"}>
                      {selectedUser.role}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Contact Information</h4>
                    <div className="text-sm space-y-2">
                      <div>
                        <span className="text-muted-foreground">Phone:</span>
                        <p>{selectedUser.phone}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Location:</span>
                        <p>
                          {selectedUser.location.village && `${selectedUser.location.village}, `}
                          {selectedUser.location.district}, {selectedUser.location.state}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Verification Status</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {selectedUser.verification.phoneVerified ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="text-sm">Phone Verified</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {selectedUser.verification.emailVerified ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="text-sm">Email Verified</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {selectedUser.verification.documentVerified ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="text-sm">Documents Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Action Dialog */}
        <Dialog open={actionDialog} onOpenChange={setActionDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {actionType === "ban"
                  ? "Ban User"
                  : actionType === "suspend"
                    ? "Suspend User"
                    : actionType === "verify"
                      ? "Verify User"
                      : "User Action"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Reason</Label>
                <Textarea
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  placeholder={`Please provide a reason for ${actionType}ing this user...`}
                  rows={3}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setActionDialog(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={executeAction}
                  variant={actionType === "ban" || actionType === "suspend" ? "destructive" : "default"}
                >
                  {actionType === "ban"
                    ? "Ban User"
                    : actionType === "suspend"
                      ? "Suspend User"
                      : actionType === "verify"
                        ? "Verify User"
                        : "Execute Action"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
