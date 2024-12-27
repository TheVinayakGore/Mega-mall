import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(): Promise<NextResponse> {
  try {
    const query = `*[_type == "pincodeList"][0].pincodes`;
    const pincodes: string[] = await client.fetch(query);

    if (!pincodes) {
      throw new Error("No pincodes found");
    }

    return NextResponse.json(pincodes);
  } catch (error) {
    console.error("Error fetching pincode data:", error);
    // Fallback data if there’s an error
    return NextResponse.json(["234322", "123456", "654321", "413216"]);
  }
}
