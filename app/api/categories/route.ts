import { NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"
import type { ApiResponse, Category } from "@/lib/types"

export async function GET() {
  try {
    const categories = await DatabaseService.getCategories()

    const response: ApiResponse<Category[]> = {
      success: true,
      data: categories,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching categories:", error)

    const response: ApiResponse<never> = {
      success: false,
      error: "Failed to fetch categories",
    }

    return NextResponse.json(response, { status: 500 })
  }
}
