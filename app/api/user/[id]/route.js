import { apiOk, apiError } from "@/lib/api";
import { getUser } from "@/lib/models/users";

export async function GET(_request, { params }) {
  const user = getUser(params.id);
  if (!user) return apiError(404, "not_found", "User not found");
  return apiOk({ user });
}
