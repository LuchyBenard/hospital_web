import Link from "next/link";
import { Card } from "@/components/ui/card";

const dateFmt = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export function PostCard({ post }) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <Link href={`/posts/${post.id}`} className="block">
        <h3 className="text-lg font-semibold text-fg hover:text-accent">
          {post.title}
        </h3>
      </Link>
      <p className="mb-3 text-sm text-mute">{post.body}</p>
      <div className="flex items-center justify-between text-xs text-mute">
        <span>{post.authorName}</span>
        <span className="t-mono">
          {dateFmt.format(new Date(post.createdAt))}
        </span>
      </div>
    </Card>
  );
}
