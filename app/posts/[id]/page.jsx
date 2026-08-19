import { notFound } from "next/navigation";
import { getPost } from "@/lib/models/posts";
import { Card } from "@/components/ui/card";

const dateFmt = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function PostPage({ params }) {
  const post = getPost(params.id);
  if (!post) notFound();

  return (
    <main className="container-content py-16 max-w-2xl">
      <Card>
        <h1 className="text-2xl font-semibold mb-2">{post.title}</h1>
        <div className="flex items-center justify-between text-xs text-mute mb-6">
          <span>{post.authorName}</span>
          <span className="t-mono">{dateFmt.format(new Date(post.createdAt))}</span>
        </div>
        <p className="text-fg">{post.body}</p>
      </Card>
    </main>
  );
}
