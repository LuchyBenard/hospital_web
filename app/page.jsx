import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container-content py-16">
      <section className="max-w-2xl">
        <p className="t-lead mb-2">Fullstack scaffold</p>
        <h1 className="t-display mb-4">Build apps that read as designed.</h1>
        <p className="t-lead mb-8">
          This is a working Next.js App Router shell with auth, navigation, and
          API routes returning dummy data. Wire a real backend when ready.
        </p>
        <div className="flex gap-3">
          <Link href="/signup">
            <Button size="lg">Get started</Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="secondary">
              Sign in
            </Button>
          </Link>
        </div>
      </section>

      <section className="mt-16 grid gap-4 sm:grid-cols-3">
        <Card>
          <h3 className="mb-2">Auth context</h3>
          <p className="text-sm text-mute">
            One provider owns user state app-wide. Components read it through
            useAuth, never hidden UI.
          </p>
        </Card>
        <Card>
          <h3 className="mb-2">Nav shell</h3>
          <p className="text-sm text-mute">
            Public navbar, logged-in sidebar and bottom nav, all from one
            constants file.
          </p>
        </Card>
        <Card>
          <h3 className="mb-2">API contract</h3>
          <p className="text-sm text-mute">
            Route handlers validate at the boundary and return a consistent
            error shape.
          </p>
        </Card>
      </section>
    </main>
  );
}
