import { listDepartments } from "@/lib/models/departments";
import { NextResponse } from "next/server";

export async function GET() {
  const items = listDepartments();
  return NextResponse.json({ departments: items, total: items.length });
}
