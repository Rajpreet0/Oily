import axios from "axios";
import { NextResponse } from "next/server";


export async function GET(){
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_OPEN_WEATHER;
    const apikey = process.env.NEXT_PUBLIC_API_KEY_OPEN_WEATHER;

    if (!baseUrl || !apikey) {
        return NextResponse.json(
            { error: "Missing environment variables" },
            { status: 500 }
        )
    }

    const API_URL=`${baseUrl}?zip=63512,DE&appid=${apikey}&units=metric`;

    try {
        const response = await axios.get(API_URL, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.log("Axios error:", error);

        return NextResponse.json(
            {
                error: "API request failed",
                message: error.message,
                details: error.response?.data ?? null
            },
            { status: error.response?.status || 500 }
        )
    }
}