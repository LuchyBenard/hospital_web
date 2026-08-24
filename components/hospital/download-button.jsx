"use client";

import { Button } from "@/components/ui/button";

// Client island: form downloads trigger a browser alert until real PDFs ship.
export function DownloadButton({ name }) {
  return (
    <Button
      size="sm"
      variant="secondary"
      onClick={() => alert(`Downloading official clinical PDF: ${name}`)}
    >
      Download
    </Button>
  );
}
