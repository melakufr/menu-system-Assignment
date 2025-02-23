import { NextRequest, NextResponse } from "next/server";
import type { ResponseData } from "@/types/menu";
import axiosInstance from "@/axiosInterceptor";

export async function GET(request: NextRequest) {
  try {
    const { data } = await axiosInstance.get(`/menus`, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: request.headers.get("Authorization"),
        // 'API-Key': process.env.DATA_API_KEY,
      },
    });

    return NextResponse.json({
      data,
      status: 200,
    } as ResponseData);
  } catch (error) {
    return NextResponse.json({
      data: [],
      status: 500,
    } as ResponseData);
  }
}

export async function POST(request: Request) {
  const formData = await request.json();

  try {
    const { data } = await axiosInstance.post(`/menus/create`,formData, {
      
      headers: {
        "Content-Type": "application/json",
        // Authorization: request.headers.get("Authorization"),
        // 'API-Key': process.env.DATA_API_KEY,
      },
    });

    return NextResponse.json({
      data, //data: data,
      status: 200,
    } as ResponseData);
  } catch (error) {
    return NextResponse.json({
      data: [],
      status: 500,
      error,
    } as ResponseData);
  }
}
