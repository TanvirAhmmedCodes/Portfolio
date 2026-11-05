import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BIN_PATHS = [
  path.join(process.cwd(), "public", "soundtrack.bin"),
  path.join(process.cwd(), "lib", "soundtrack.bin"),
];

export async function GET() {
  try {
    let targetPath = BIN_PATHS.find((p) => fs.existsSync(p));
    if (!targetPath) {
      return new NextResponse("Soundtrack asset not found", { status: 404 });
    }

    const fileBuffer = fs.readFileSync(targetPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": "inline",
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("Failed to serve soundtrack:", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

