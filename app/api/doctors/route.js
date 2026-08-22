import { listDoctors } from "@/lib/models/doctors";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const departmentSlug = searchParams.get("departmentSlug") || undefined;
  const specialty = searchParams.get("specialty") || undefined;
  const search = searchParams.get("search") || undefined;

  const items = listDoctors({ departmentSlug, specialty, search });
  return NextResponse.json({ doctors: items, total: items.length });
}
