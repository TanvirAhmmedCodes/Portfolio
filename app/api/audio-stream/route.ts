import { NextResponse } from "next/server";
import soundtrackData from "@/lib/soundtrack.json";

export async function GET() {
  return NextResponse.json(soundtrackData, {
    status: 200,
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
