import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"
import type { ApiResponse, Product } from "@/lib/types"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = await DatabaseService.getProductById(params.id)

    if (!product) {
      const response: ApiResponse<never> = {
        success: false,
        error: "Product not found",
      }
      return NextResponse.json(response, { status: 404 })
    }

    const response: ApiResponse<Product> = {
      success: true,
      data: product,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching product:", error)

    const response: ApiResponse<never> = {
      success: false,
      error: "Failed to fetch product",
    }

    return NextResponse.json(response, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    // TODO: Add authentication and authorization
    // const userId = await getUserFromToken(request)
    // Verify user owns this product or is admin

    const product = await DatabaseService.updateProduct(params.id, body)

    if (!product) {
      const response: ApiResponse<never> = {
        success: false,
        error: "Product not found",
      }
      return NextResponse.json(response, { status: 404 })
    }

    const response: ApiResponse<Product> = {
      success: true,
      data: product,
      message: "Product updated successfully",
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error updating product:", error)

    const response: ApiResponse<never> = {
      success: false,
      error: "Failed to update product",
    }

    return NextResponse.json(response, { status: 500 })
  }
}
