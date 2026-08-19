// Data-access layer for posts. Dummy, in-memory, single source of truth for
// post reads/writes so components never touch storage directly (skills/backend.md).
// Replace the in-memory store with Firestore/Supabase queries when wiring real
// backend, keeping these function signatures.

let posts = [
  {
    id: "post-001",
    title: "Shipping a free-tier backend that survives real users",
    body: "Reads you never perform cost nothing. Design the data model so each screen is one read, not one per element.",
    authorId: "demo-user-001",
    authorName: "Ada Quinn",
    createdAt: "2026-02-01T10:00:00.000Z",
  },
  {
    id: "post-002",
    title: "Security rules are your backend",
    body: "With a client-direct stack the database is the enforcement point. Default deny, scope to the owner, split reads from writes.",
    authorId: "demo-user-001",
    authorName: "Ada Quinn",
    createdAt: "2026-02-04T14:30:00.000Z",
  },
  {
    id: "post-003",
    title: "Why we do not ship purple gradients",
    body: "The design should read as deliberate and specific to the product, not as every other AI landing page.",
    authorId: "demo-user-001",
    authorName: "Ada Quinn",
    createdAt: "2026-02-09T08:15:00.000Z",
  },
];

export function listPosts({ page = 1, pageSize = 10 } = {}) {
  const start = (page - 1) * pageSize;
  const items = posts.slice(start, start + pageSize);
  return { items, page, pageSize, total: posts.length };
}

export function getPost(id) {
  return posts.find((p) => p.id === id) || null;
}

export function createPost(data) {
  const post = {
    id: `post-${Date.now()}`,
    authorId: data.authorId || "demo-user-001",
    authorName: data.authorName || "Ada Quinn",
    createdAt: new Date().toISOString(),
    ...data,
  };
  posts = [post, ...posts];
  return post;
}

export function updatePost(id, data) {
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  posts[idx] = { ...posts[idx], ...data };
  return posts[idx];
}

export function deletePost(id) {
  const before = posts.length;
  posts = posts.filter((p) => p.id !== id);
  return posts.length < before;
}
