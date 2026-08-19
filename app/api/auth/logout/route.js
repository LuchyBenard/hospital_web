import { apiOk } from "@/lib/api";

export async function POST() {
  // Dummy logout. Replace with session/cookie clearing on wiring.
  return apiOk({ ok: true });
}
