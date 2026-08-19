import { listPosts } from "@/lib/models/posts";
import { PostCard } from "@/components/post/post-card";
import { PostForm } from "@/components/post/post-form";
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  const { items } = listPosts({ page: 1, pageSize: 10 });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Dashboard</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <Card>
          <h3 className="mb-4">New post</h3>
          <PostForm />
        </Card>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Recent posts</h3>
          <div className="grid gap-4">
            {items.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
