import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"
import type { ApiResponse, Product } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const filters = {
      category: searchParams.get("category") || undefined,
      state: searchParams.get("state") || undefined,
      minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
      maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
      search: searchParams.get("search") || undefined,
      limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 20,
      skip: searchParams.get("skip") ? Number(searchParams.get("skip")) : 0,
    }

    const products = await DatabaseService.getProducts(filters)

    const response: ApiResponse<Product[]> = {
      success: true,
      data: products,
      message: `Found ${products.length} products`,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching products:", error)

    const response: ApiResponse<never> = {
      success: false,
      error: "Failed to fetch products",
    }

    return NextResponse.json(response, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // TODO: Add authentication middleware to verify seller
    // const userId = await getUserFromToken(request)

    const product = await DatabaseService.createProduct(body)

    const response: ApiResponse<Product> = {
      success: true,
      data: product,
      message: "Product created successfully",
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)

    const response: ApiResponse<never> = {
      success: false,
      error: "Failed to create product",
    }

    return NextResponse.json(response, { status: 500 })
  }
}
