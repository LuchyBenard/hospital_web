import { z } from "zod";
import { apiOk, apiError } from "@/lib/api";
import { demoUser } from "@/constants";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return apiError(400, "bad_request", "Invalid JSON body");
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return apiError(422, "validation", "Email and password (6+ chars) required");
  }

  // Dummy session. Replace with Firebase/Auth provider on wiring.
  return apiOk({ user: { ...demoUser, email: parsed.data.email }, token: "dummy-token" }, 201);
}
