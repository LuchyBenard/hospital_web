import { NextResponse } from "next/server";

// Consistent API error contract: { error: { code, message } }.
export function apiError(status, code, message) {
  return NextResponse.json({ error: { code, message } }, { status });
}

export function apiOk(data, status = 200) {
  return NextResponse.json(data, { status });
}
