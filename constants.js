// Single source of truth for nav menus and route lists.
// Consumed by Navbar, Sidebar, and BottomNav.

export const publicNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Login", href: "/login" },
];

export const appNav = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Profile", href: "/profile" },
  { label: "Settings", href: "/settings" },
];

// Demo user used to seed the auth context and API routes with dummy data.
export const demoUser = {
  id: "demo-user-001",
  name: "Ada Quinn",
  email: "ada@example.com",
  role: "member",
  createdAt: "2026-01-12T09:24:00.000Z",
};
