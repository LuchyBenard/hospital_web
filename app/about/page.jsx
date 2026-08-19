export default function AboutPage() {
  return (
    <main className="container-content py-16 max-w-2xl">
      <p className="t-lead mb-2">About</p>
      <h1 className="t-display mb-4">Built to stay inside free limits.</h1>
      <p className="mb-4">
        The backend is free-tier-first: no Cloud or Edge Functions, client-direct
        reads and writes, and rules or RLS as the enforcement layer. Every read
        and write is designed to cost as little quota as possible.
      </p>
      <p>
        The frontend is industry-derived, not trend-derived. No purple gradients,
        no glassmorphism by default, no emoji icons. Deliberate and specific.
      </p>
    </main>
  );
}
