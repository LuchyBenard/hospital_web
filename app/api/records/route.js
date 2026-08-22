import { listRecords, getRecordById } from "@/lib/models/records";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const patientId = searchParams.get("patientId") || undefined;
  const category = searchParams.get("category") || undefined;

  if (id) {
    const record = getRecordById(id);
    if (!record) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Record not found" } },
        { status: 404 }
      );
    }
    return NextResponse.json({ record });
  }

  const items = listRecords({ patientId, category });
  return NextResponse.json({ records: items, total: items.length });
}
