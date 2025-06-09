import axios from "axios";
import { NextResponse } from "next/server";



export async function GET() {
    
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_EIA;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY_EIA;

    if (!baseUrl || !apiKey) {
        return NextResponse.json(
            { error: "Missing environment variables."},
            { status: 500 }
        )
    }

    const API_URL = `${baseUrl}?frequency=daily&data[0]=value&facets[series][]=RBRTE&start=2025-01-01&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000&api_key=${apiKey}`

    
    try {   
        const response = await axios.get(API_URL, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.log("Error fetching Oilprices: ", error);
        return NextResponse.json({
            error: "Failed to fetch Oilprice",
            message: error.message,
            details: error.response?.data ?? null
        }, {
            status: error.response?.status || 500
        })
    }
}