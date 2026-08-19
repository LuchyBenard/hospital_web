import { z } from "zod";
import { apiOk, apiError } from "@/lib/api";
import { listPosts, createPost } from "@/lib/models/posts";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || "1");
  const pageSize = Number(searchParams.get("pageSize") || "10");
  const result = listPosts({ page, pageSize });
  return apiOk(result);
}

const schema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  authorId: z.string().optional(),
  authorName: z.string().optional(),
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
    return apiError(422, "validation", "Title and body are required");
  }

  const post = createPost(parsed.data);
  return apiOk({ post }, 201);
}
