"use client";

import { useMemo, useState } from "react";
import { healthArticles } from "@/constants";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = ["All", ...new Set(healthArticles.map((a) => a.category))];

export default function HealthLibraryPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return healthArticles.filter((a) => {
      const matchesCategory =
        category === "All" || a.category === category;
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <main className="container-content py-12 sm:py-16">
      <div className="mb-10 max-w-2xl">
        <span className="badge badge-accent mb-2">Health Education Library</span>
        <h1 className="t-display text-3xl sm:text-4xl text-fg mb-4">
          Health Library & Patient Education
        </h1>
        <p className="t-lead text-sm sm:text-base">
          Evidence-informed articles written by our clinicians to help you better
          understand conditions, medications, and diagnostics.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mute"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, topics, or clinicians..."
            className="input-clinical h-11 pl-9 text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                category === cat
                  ? "bg-accent text-accent-fg"
                  : "bg-surface text-mute hover:text-fg border border-line"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <p className="mb-6 text-xs text-mute">
        {filtered.length} {filtered.length === 1 ? "article" : "articles"}
        {category !== "All" && ` in ${category}`}
        {query && ` matching "${query}"`}
      </p>

      {/* Article Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <Card
              key={article.id}
              className="flex flex-col justify-between p-6 transition-shadow hover:shadow-sm"
            >
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span className="badge badge-info text-xs">
                    {article.category}
                  </span>
                  <span className="text-[11px] text-mute">{article.readTime}</span>
                </div>
                <h2 className="text-base font-bold text-fg mb-2 leading-snug">
                  {article.title}
                </h2>
                <p className="text-xs leading-relaxed text-mute line-clamp-3 mb-4">
                  {article.excerpt}
                </p>
              </div>
              <div className="border-t border-line pt-3">
                <div className="mb-3 text-[11px] text-mute">
                  {article.author} &bull;{" "}
                  {new Date(article.date).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-full"
                  onClick={() => setSelected(article)}
                >
                  Read Article
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-line bg-surface p-12 text-center">
          <p className="text-sm font-semibold text-fg mb-1">
            No articles match your search.
          </p>
          <p className="text-xs text-mute">
            Try a different keyword or reset the category filter.
          </p>
        </div>
      )}

      {/* Article Reader Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-10 sm:pt-16 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-xl border border-line bg-surface p-6 sm:p-8 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <span className="badge badge-info text-xs mb-2">
                  {selected.category}
                </span>
                <h2 className="text-xl font-bold text-fg leading-snug">
                  {selected.title}
                </h2>
                <p className="mt-1.5 text-xs text-mute">
                  {selected.author} &bull; {selected.readTime} &bull;{" "}
                  {new Date(selected.date).toLocaleDateString(undefined, {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="shrink-0 text-lg font-bold text-mute hover:text-fg"
                aria-label="Close article"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-fg">
              {selected.sections.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-line bg-bg p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-accent block mb-2">
                Key Takeaways
              </span>
              <ul className="space-y-1.5 text-xs text-fg">
                {selected.takeaways.map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">&#10003;</span> {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex justify-end gap-2 border-t border-line pt-4">
              <Button variant="secondary" size="sm" onClick={() => setSelected(null)}>
                Close
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  window.print();
                }}
              >
                Print / Save PDF
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}