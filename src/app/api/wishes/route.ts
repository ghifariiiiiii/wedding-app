import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const wishesFilePath = path.join(process.cwd(), "data", "wishes.json");

// Ensure file exists
function ensureFileExists() {
  const dirPath = path.dirname(wishesFilePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  if (!fs.existsSync(wishesFilePath)) {
    fs.writeFileSync(
      wishesFilePath,
      JSON.stringify([
        {
          id: "1",
          name: "Mr. Albert Margaretta",
          message: "Congratulations Olivia and Ralph! Wishing you a lifetime of love and happiness together. We love you both so much!",
          hearts: 5,
          createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        },
        {
          id: "2",
          name: "Sophia Martinez",
          message: "So happy for you two! Can't wait to celebrate your beautiful wedding day! ❤️✨",
          hearts: 3,
          createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        },
        {
          id: "3",
          name: "David Miller",
          message: "Wishing you guys a fantastic journey ahead. Best wishes for Ralph and Olivia!",
          hearts: 2,
          createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        },
      ])
    );
  }
}

export async function GET() {
  try {
    ensureFileExists();
    const data = fs.readFileSync(wishesFilePath, "utf8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: "Failed to read wishes data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    ensureFileExists();
    const body = await request.json();
    const { action, id, name, message } = body;

    const data = fs.readFileSync(wishesFilePath, "utf8");
    const wishes = JSON.parse(data);

    if (action === "like") {
      // Find wish and increment hearts
      const wish = wishes.find((w: any) => w.id === id);
      if (wish) {
        wish.hearts = (wish.hearts || 0) + 1;
        fs.writeFileSync(wishesFilePath, JSON.stringify(wishes, null, 2));
        return NextResponse.json(wish);
      }
      return NextResponse.json({ error: "Wish not found" }, { status: 404 });
    }

    // Add new wish
    if (!name || !message) {
      return NextResponse.json({ error: "Name and message are required" }, { status: 400 });
    }

    const newWish = {
      id: Date.now().toString(),
      name,
      message,
      hearts: 0,
      createdAt: new Date().toISOString(),
    };

    wishes.unshift(newWish); // Add to the top
    fs.writeFileSync(wishesFilePath, JSON.stringify(wishes, null, 2));

    return NextResponse.json(newWish, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save wishes data" }, { status: 500 });
  }
}
