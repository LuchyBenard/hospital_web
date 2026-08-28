import { createInquiry } from "@/lib/models/inquiries";
import { apiError } from "@/lib/api";
import { NextResponse } from "next/server";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(120),
  phone: z
    .string()
    .trim()
    .max(30)
    .optional()
    .or(z.literal("")),
  subject: z.string().trim().min(1, "Please choose an inquiry subject.").max(160),
  message: z
    .string()
    .trim()
    .min(10, "Please describe your question in at least 10 characters.")
    .max(2000, "Please keep your message to 2,000 characters or fewer."),
});

// Simple in-memory rate limit per IP (5 inquiries / 15 minutes). Resets on
// server restart; sufficient for a free-tier demo. Replace with a persisted
// store if the server runs long-lived.
const rateBucket = new Map();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateBucket.get(ip);
  if (!entry || now - entry.start > RATE_WINDOW_MS) {
    rateBucket.set(ip, { start: now, count: 1 });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function clientIp(request) {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request) {
  const ip = clientIp(request);

  if (isRateLimited(ip)) {
    return apiError(
      429,
      "RATE_LIMITED",
      "You have sent too many inquiries. Please wait a while and try again."
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return apiError(400, "INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return apiError(
      422,
      "VALIDATION_ERROR",
      parsed.error.issues[0]?.message || "Please check your details and try again."
    );
  }

  try {
    const inquiry = await createInquiry(parsed.data);
    return NextResponse.json(
      { inquiry: { id: inquiry.id }, received: true },
      { status: 201 }
    );
  } catch (err) {
    return apiError(500, "INTERNAL_ERROR", "We could not save your inquiry. Please try again.");
  }
}
