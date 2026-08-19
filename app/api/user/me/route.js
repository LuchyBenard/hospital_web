import { apiOk } from "@/lib/api";
import { getCurrentUser } from "@/lib/models/users";

export async function GET() {
  return apiOk({ user: getCurrentUser() });
}
