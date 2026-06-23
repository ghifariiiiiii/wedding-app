import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const rsvpFilePath = path.join(process.cwd(), "data", "rsvps.json");

// Ensure file exists
function ensureFileExists() {
  const dirPath = path.dirname(rsvpFilePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  if (!fs.existsSync(rsvpFilePath)) {
    fs.writeFileSync(rsvpFilePath, JSON.stringify([]));
  }
}

export async function GET() {
  try {
    ensureFileExists();
    const data = fs.readFileSync(rsvpFilePath, "utf8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: "Failed to read RSVP data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    ensureFileExists();
    const body = await request.json();
    const { name, status, guests, message } = body;

    if (!name || !status) {
      return NextResponse.json({ error: "Name and attendance status are required" }, { status: 400 });
    }

    const data = fs.readFileSync(rsvpFilePath, "utf8");
    const rsvps = JSON.parse(data);

    const newRsvp = {
      id: Date.now().toString(),
      name,
      status,
      guests: guests || 1,
      message: message || "",
      createdAt: new Date().toISOString(),
    };

    rsvps.push(newRsvp);
    fs.writeFileSync(rsvpFilePath, JSON.stringify(rsvps, null, 2));

    return NextResponse.json(newRsvp, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save RSVP data" }, { status: 500 });
  }
}
