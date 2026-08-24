export default function RootLoading() {
  return (
    <main className="container-content py-16" aria-busy="true" aria-label="Loading page">
      <div className="max-w-2xl">
        <div className="skeleton h-4 w-40 mb-6" />
        <div className="skeleton h-10 w-full mb-3" />
        <div className="skeleton h-10 w-3/4 mb-8" />
        <div className="skeleton h-4 w-full mb-2" />
        <div className="skeleton h-4 w-5/6 mb-8" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-12">
          <div className="skeleton h-44 w-full" />
          <div className="skeleton h-44 w-full" />
          <div className="skeleton h-44 w-full" />
        </div>
      </div>
    </main>
  );
}
