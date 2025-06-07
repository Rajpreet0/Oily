import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(){
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const apikey = process.env.NEXT_PUBLIC_API_KEY_TANKSTELLE;

    if (!baseUrl || !apikey) {
         return NextResponse.json(
            { error: "Missing environment variables" },
            { status: 500 }
         )
    }

    // The ID is for the Avia Gas Station in Hainburg
    const API_URL=`${baseUrl}?id=93814a0a-ca2b-4270-8733-3adc90a2edfa&apikey=${apikey}`;

    try { 
        const response = await axios.get(API_URL, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error("Axios error:", error);

        return NextResponse.json(
            {
                error: "API request failed",
                message: error.message,
                details: error.response?.data ?? null
            },
            { status: error.response?.status || 500 }
        );
    }

}