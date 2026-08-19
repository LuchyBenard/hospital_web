import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const tiers = [
  { name: "Free", price: "$0", note: "Free-tier backend, dummy data to start." },
  { name: "Pro", price: "$12", note: "Real Firebase wiring, more quota headroom." },
  { name: "Team", price: "$39", note: "Shared workspace, roles, audit logs." },
];

export default function PricingPage() {
  return (
    <main className="container-content py-16">
      <h1 className="t-display mb-2">Pricing</h1>
      <p className="t-lead mb-10">Start free. Pay only when you outgrow the tier.</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {tiers.map((t) => (
          <Card key={t.name} className="flex flex-col">
            <h3 className="text-lg font-semibold">{t.name}</h3>
            <p className="t-mono text-3xl font-bold my-2">{t.price}</p>
            <p className="text-sm text-mute mb-4 flex-1">{t.note}</p>
            <Link href="/signup">
              <Button variant={t.name === "Pro" ? "primary" : "secondary"} className="w-full">
                Choose {t.name}
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </main>
  );
}
