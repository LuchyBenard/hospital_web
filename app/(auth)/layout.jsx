// Centered, no Navbar (root Navbar hides itself on these routes).
export default function AuthLayout({ children }) {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="text-lg font-semibold tracking-tight">iBuild</span>
        </div>
        {children}
      </div>
    </main>
  );
}
