import {
  listAppointments,
  createAppointment,
} from "@/lib/models/appointments";
import { NextResponse } from "next/server";
import { z } from "zod";

const createSchema = z.object({
  patientId: z.string().optional(),
  patientName: z.string().min(1, "Patient name required"),
  doctorId: z.string().min(1, "Doctor required"),
  doctorName: z.string().optional(),
  doctorSpecialty: z.string().optional(),
  departmentName: z.string().optional(),
  date: z.string().min(1, "Date required"),
  time: z.string().min(1, "Time slot required"),
  location: z.string().optional(),
  type: z.string().optional(),
  notes: z.string().optional(),
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const patientId = searchParams.get("patientId") || undefined;
  const status = searchParams.get("status") || undefined;

  const items = listAppointments({ patientId, status });
  return NextResponse.json({ appointments: items, total: items.length });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = createSchema.safeParse(body);
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

    const created = createAppointment(parsed.data);
    return NextResponse.json({ appointment: created }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_ERROR",
          message: err.message || "Failed to create appointment",
        },
      },
      { status: 500 }
    );
  }
}
