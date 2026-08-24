"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { hospitalInfo } from "@/constants";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="container-content py-24">
      <Card className="max-w-xl mx-auto p-8 text-center">
        <p className="t-mono text-sm text-mute mb-2">Something went wrong</p>
        <h1 className="text-2xl font-bold mb-3">
          We could not load this page
        </h1>
        <p className="text-mute mb-6">
          The request failed on our side. Your data is safe. Try again, and if
          the problem keeps happening call our front desk at{" "}
          {hospitalInfo.phone.general}.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button onClick={() => reset()}>Try Again</Button>
        </div>
      </Card>
    </main>
  );
}
