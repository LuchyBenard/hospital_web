import { siteConfig } from "@/constants";

export default function sitemap() {
  const lastModified = new Date();

  const routes = [
    { path: "", priority: 1.0, freq: "weekly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/departments", priority: 0.9, freq: "weekly" },
    { path: "/doctors", priority: 0.9, freq: "weekly" },
    { path: "/appointments", priority: 0.9, freq: "weekly" },
    { path: "/emergency", priority: 1.0, freq: "monthly" },
    { path: "/contact", priority: 0.8, freq: "monthly" },
    { path: "/pricing", priority: 0.7, freq: "monthly" },
    { path: "/resources", priority: 0.6, freq: "monthly" },
    { path: "/login", priority: 0.3, freq: "yearly" },
    { path: "/signup", priority: 0.4, freq: "yearly" },
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified,
    changeFrequency: route.freq,
    priority: route.priority,
  }));
}
