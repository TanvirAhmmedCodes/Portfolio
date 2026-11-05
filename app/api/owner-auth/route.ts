import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const ownerPassword = process.env.OWNER_PASSWORD || "T@nv1r#Ahm_2025!";

    if (password === ownerPassword) {
      return NextResponse.json({ success: true, token: "authenticated_session_token" });
    }

    return NextResponse.json({ success: false, message: "Invalid access credentials" }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request payload" }, { status: 400 });
  }
}
