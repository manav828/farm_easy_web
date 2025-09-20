"use client"

import { useState } from "react"
import { ArrowLeft, Package, CheckCircle, Clock, XCircle, Star, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"

// Extended mock order data
const allOrders = [
  {
    id: "ORD001",
    productName: "Organic Wheat",
    productImage: "/wheat-field-golden-harvest.jpg",
    sellerName: "Ravi Patel",
    sellerPhone: "+91-9876543213",
    quantity: "100 kg",
    pricePerUnit: 85,
    totalAmount: 8500,
    orderDate: "2024-12-01",
    status: "delivered",
    deliveryDate: "2024-12-05",
    trackingId: "TRK001",
    paymentMethod: "UPI",
    deliveryAddress: "123 Main St, New Delhi, 110001",
  },
  {
    id: "ORD002",
    productName: "Fresh Onions",
    productImage: "/fresh-red-tomatoes-in-wooden-crate.jpg",
    sellerName: "Sunita Devi",
    sellerPhone: "+91-9876543214",
    quantity: "50 kg",
    pricePerUnit: 30,
    totalAmount: 1500,
    orderDate: "2024-11-28",
    status: "delivered",
    deliveryDate: "2024-12-02",
    trackingId: "TRK002",
    paymentMethod: "Cash on Delivery",
    deliveryAddress: "123 Main St, New Delhi, 110001",
  },
  {
    id: "ORD003",
    productName: "Organic Fertilizer",
    productImage: "/organic-fertilizer-bag-in-farm-setting.jpg",
    sellerName: "Green Earth Co.",
    sellerPhone: "+91-9876543215",
    quantity: "2 bags",
    pricePerUnit: 350,
    totalAmount: 700,
    orderDate: "2024-11-25",
    status: "in-transit",
    expectedDelivery: "2024-12-18",
    trackingId: "TRK003",
    paymentMethod: "UPI",
    deliveryAddress: "123 Main St, New Delhi, 110001",
  },
  {
    id: "ORD004",
    productName: "Premium Rice Seeds",
    productImage: "/wheat-seeds-in-farmer-hands.jpg",
    sellerName: "Mohan Kumar",
    sellerPhone: "+91-9876543216",
    quantity: "25 kg",
    pricePerUnit: 120,
    totalAmount: 3000,
    orderDate: "2024-11-20",
    status: "cancelled",
    cancelDate: "2024-11-22",
    cancelReason: "Product not available",
    trackingId: "TRK004",
    paymentMethod: "UPI",
    refundAmount: 3000,
    refundDate: "2024-11-23",
  },
]

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [reviewDialog, setReviewDialog] = useState(false)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "in-transit":
        return <Package className="h-5 w-5 text-blue-500" />
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
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

  const filterOrdersByStatus = (status: string) => {
    if (status === "all") return allOrders
    return allOrders.filter((order) => order.status === status)
  }

  const OrderCard = ({ order }: { order: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
            <img
              src={order.productImage || "/placeholder.svg"}
              alt={order.productName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg">{order.productName}</h3>
                <p className="text-sm text-muted-foreground">Order #{order.id}</p>
              </div>
              <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <span className="text-muted-foreground">Seller:</span>
                <p className="font-medium">{order.sellerName}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Quantity:</span>
                <p className="font-medium">{order.quantity}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Total Amount:</span>
                <p className="font-medium text-primary">₹{order.totalAmount.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Order Date:</span>
                <p className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {getStatusIcon(order.status)}
                <span>
                  {order.status === "delivered"
                    ? `Delivered on ${new Date(order.deliveryDate).toLocaleDateString()}`
                    : order.status === "in-transit"
                      ? `Expected: ${new Date(order.expectedDelivery).toLocaleDateString()}`
                      : order.status === "cancelled"
                        ? `Cancelled on ${new Date(order.cancelDate).toLocaleDateString()}`
                        : `Ordered on ${new Date(order.orderDate).toLocaleDateString()}`}
                </span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setSelectedOrder(order)}>
                  View Details
                </Button>
                {order.status === "delivered" && (
                  <Button size="sm" onClick={() => setReviewDialog(true)}>
                    <Star className="h-4 w-4 mr-1" />
                    Review
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/buyer/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-xl font-semibold">My Orders</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="in-transit">In Transit</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filterOrdersByStatus("all").map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>

          <TabsContent value="delivered" className="space-y-4">
            {filterOrdersByStatus("delivered").map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>

          <TabsContent value="in-transit" className="space-y-4">
            {filterOrdersByStatus("in-transit").map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {filterOrdersByStatus("pending").map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            {filterOrdersByStatus("cancelled").map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>
        </Tabs>

        {/* Order Details Dialog */}
        {selectedOrder && (
          <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Order Details - #{selectedOrder.id}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={selectedOrder.productImage || "/placeholder.svg"}
                      alt={selectedOrder.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{selectedOrder.productName}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(selectedOrder.status)}
                      <Badge className={getStatusColor(selectedOrder.status)}>{selectedOrder.status}</Badge>
                    </div>
                    <p className="text-muted-foreground">Tracking ID: {selectedOrder.trackingId}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Order Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Quantity:</span>
                        <span>{selectedOrder.quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price per unit:</span>
                        <span>₹{selectedOrder.pricePerUnit}</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Total Amount:</span>
                        <span className="text-primary">₹{selectedOrder.totalAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment Method:</span>
                        <span>{selectedOrder.paymentMethod}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Seller Information</h4>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {selectedOrder.sellerName
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{selectedOrder.sellerName}</p>
                        <p className="text-sm text-muted-foreground">{selectedOrder.sellerPhone}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold">Delivery Information</h4>
                  <div className="text-sm space-y-2">
                    <div>
                      <span className="text-muted-foreground">Delivery Address:</span>
                      <p>{selectedOrder.deliveryAddress}</p>
                    </div>
                    {selectedOrder.status === "delivered" && (
                      <div>
                        <span className="text-muted-foreground">Delivered on:</span>
                        <p>{new Date(selectedOrder.deliveryDate).toLocaleDateString()}</p>
                      </div>
                    )}
                    {selectedOrder.status === "in-transit" && (
                      <div>
                        <span className="text-muted-foreground">Expected delivery:</span>
                        <p>{new Date(selectedOrder.expectedDelivery).toLocaleDateString()}</p>
                      </div>
                    )}
                    {selectedOrder.status === "cancelled" && (
                      <div className="space-y-1">
                        <div>
                          <span className="text-muted-foreground">Cancelled on:</span>
                          <p>{new Date(selectedOrder.cancelDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Reason:</span>
                          <p>{selectedOrder.cancelReason}</p>
                        </div>
                        {selectedOrder.refundAmount && (
                          <div>
                            <span className="text-muted-foreground">Refund:</span>
                            <p className="text-green-600">
                              ₹{selectedOrder.refundAmount.toLocaleString()} refunded on{" "}
                              {new Date(selectedOrder.refundDate).toLocaleDateString()}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Review Dialog */}
        <Dialog open={reviewDialog} onOpenChange={setReviewDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Write a Review</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Rating</Label>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button key={star} variant="ghost" size="sm" className="p-1" onClick={() => setRating(star)}>
                      <Star
                        className={`h-6 w-6 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="review">Review</Label>
                <Textarea
                  id="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share your experience with this product and seller..."
                  rows={4}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setReviewDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setReviewDialog(false)}>Submit Review</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
