import {
  listPrescriptions,
  getPrescriptionById,
  requestRefill,
} from "@/lib/models/prescriptions";
import { NextResponse } from "next/server";
import { z } from "zod";

const refillSchema = z.object({
  id: z.string().min(1, "Prescription ID required"),
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const patientId = searchParams.get("patientId") || undefined;
  const status = searchParams.get("status") || undefined;

  if (id) {
    const rx = getPrescriptionById(id);
    if (!rx) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Prescription not found" } },
        { status: 404 }
      );
    }
    return NextResponse.json({ prescription: rx });
  }

  const items = listPrescriptions({ patientId, status });
  return NextResponse.json({ prescriptions: items, total: items.length });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = refillSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: parsed.error.issues[0]?.message || "Invalid input",
          },
        },
        { status: 400 }
      );
    }

    const result = requestRefill(parsed.data.id);
    if (!result.success) {
      return NextResponse.json(
        { error: { code: "REFILL_FAILED", message: result.message } },
        { status: 400 }
      );
    }

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_ERROR",
          message: err.message || "Failed to process refill",
        },
      },
      { status: 500 }
    );
  }
}
