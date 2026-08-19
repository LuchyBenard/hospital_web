import { z } from "zod";
import { apiOk, apiError } from "@/lib/api";
import { getPost, updatePost, deletePost } from "@/lib/models/posts";

export async function GET(_request, { params }) {
  const post = getPost(params.id);
  if (!post) return apiError(404, "not_found", "Post not found");
  return apiOk({ post });
}

const schema = z.object({
  title: z.string().min(1).optional(),
  body: z.string().min(1).optional(),
});

export async function PATCH(request, { params }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return apiError(400, "bad_request", "Invalid JSON body");
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return apiError(422, "validation", "Nothing to update");
  }

  const post = updatePost(params.id, parsed.data);
  if (!post) return apiError(404, "not_found", "Post not found");
  return apiOk({ post });
}

export async function DELETE(_request, { params }) {
  const removed = deletePost(params.id);
  if (!removed) return apiError(404, "not_found", "Post not found");
  return apiOk({ ok: true });
}
