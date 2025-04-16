import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ message: "API route not found" }, { status: 404 });
}

export function POST() {
  return NextResponse.json({ message: "API route not found" }, { status: 404 });
}

export function PUT() {
  return NextResponse.json({ message: "API route not found" }, { status: 404 });
}

export function DELETE() {
  return NextResponse.json({ message: "API route not found" }, { status: 404 });
}
