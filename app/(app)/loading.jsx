export default function PortalLoading() {
  return (
    <div aria-busy="true" aria-label="Loading your information">
      <div className="skeleton h-8 w-64 mb-2" />
      <div className="skeleton h-4 w-96 max-w-full mb-8" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="skeleton h-32 w-full" />
        <div className="skeleton h-32 w-full" />
        <div className="skeleton h-32 w-full" />
      </div>
      <div className="skeleton h-72 w-full" />
    </div>
  );
}
