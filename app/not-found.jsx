import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { hospitalInfo } from "@/constants";

export default function NotFound() {
  return (
    <main className="container-content py-24">
      <Card className="max-w-xl mx-auto p-8 text-center">
        <p className="t-mono text-sm text-mute mb-2">Error 404</p>
        <h1 className="text-2xl font-bold mb-3">
          This page is not part of our hospital
        </h1>
        <p className="text-mute mb-6">
          The address you followed does not exist or was moved. Use the links
          below, or call our front desk at {hospitalInfo.phone.general} if you
          need help finding a service.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
          <Link href="/departments">
            <Button variant="secondary">Browse Departments</Button>
          </Link>
          <Link href="/emergency">
            <Button variant="secondary" className="border-emergency text-emergency hover:bg-emergency-light">
              Emergency Care
            </Button>
          </Link>
        </div>
      </Card>
    </main>
  );
}
