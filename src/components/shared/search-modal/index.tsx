"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

import { API_BASE_URL, API_KEY } from "@/shared/constants";

type SearchResult = {
  id: number;
  title: string;
  slug: string;
  type: string;
  url: string;
};

const TYPE_ROUTES: Record<string, string> = {
  "case-studies": "/case-study",
  solutions: "/solutions",
  blogs: "/blog",
  services: "/services",
  industries: "/industries",
};

const getHref = (type: string, slug: string) =>
  `${TYPE_ROUTES[type] ?? `/${type}`}/${slug}`;

const SearchIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
    strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ResultSkeleton = () => (
  <ul className="space-y-8">
    {Array.from({ length: 5 }).map((_, i) => (
      <li key={i} className="h-5 rounded-md bg-gray-100 animate-pulse" style={{ width: `${65 + (i % 3) * 12}%` }} />
    ))}
  </ul>
);

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [mounted, setMounted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Portal needs DOM — only render overlay after mount
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
      setSearched(false);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      return;
    }
    setTimeout(() => inputRef.current?.focus(), 60);
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Direct fetch — avoids server-only `next: { revalidate }` option in HttpService
  const search = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); setSearched(false); return; }
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}search?s=${encodeURIComponent(q.trim())}`,
        { method: "GET", headers: { "Content-Type": "application/json", "X-Aixtor-API-Key": API_KEY } }
      );
      const json = await res.json();
      setResults(Array.isArray(json?.data) ? json.data : []);
    } catch (err) {
      console.error("Search API error:", err);
      setResults([]);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(val), 400);
  }, [search]);

  const handleSubmit = useCallback((e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    search(query);
  }, [search, query]);

  const clearQuery = useCallback(() => {
    setQuery("");
    setResults([]);
    setSearched(false);
    inputRef.current?.focus();
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const overlay = (
    <div className="fixed inset-0 z-9999 bg-white flex flex-col">
      {/* Close — top right */}
      <button
        onClick={close}
        aria-label="Close search"
        className="absolute top-5 right-6 p-1 text-gray-500 hover:text-dark transition-colors"
      >
        <CloseIcon className="size-7" />
      </button>

      {/* Search input */}
      <div className="px-6 sm:px-12 md:px-20 lg:px-40 pt-12 shrink-0">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 h-14 focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-100 transition-all"
        >
          <SearchIcon className="size-5 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search content"
            className="flex-1 text-base text-dark placeholder-gray-400 bg-transparent outline-none"
          />
          {query && !loading && (
            <button type="button" onClick={clearQuery} aria-label="Clear"
              className="text-gray-400 hover:text-dark transition-colors shrink-0">
              <CloseIcon className="size-4" />
            </button>
          )}
        </form>
      </div>

      {/* Results */}
      <div className="px-6 sm:px-12 md:px-20 lg:px-40 mt-8 overflow-y-auto flex-1">
        {loading && <ResultSkeleton />}
        {!loading && results.length > 0 && (
          <ul className="space-y-8">
            {results.map(item => (
              <li key={item.id}>
                <Link
                  href={getHref(item.type, item.slug)}
                  onClick={close}
                  className="block text-base font-medium text-dark hover:text-primary transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {!loading && searched && results.length === 0 && (
          <p className="pt-10 text-sm text-gray-400 text-center">
            No results found for &ldquo;{query}&rdquo;
          </p>
        )}
      </div>

      {/* View all */}
      {!loading && results.length > 0 && (
        <div className="py-8 shrink-0 flex justify-center">
          <Link
            href={`/search?q=${encodeURIComponent(query)}`}
            onClick={close}
            className="inline-flex items-center border border-primary rounded-full px-8 py-3 text-sm font-medium text-dark hover:bg-primary hover:text-white transition-colors"
          >
            View all
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Trigger button in header */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open search"
        className="size-9 flex items-center justify-center rounded-full hover:bg-dark-200 transition-colors shrink-0"
      >
        <SearchIcon className="size-5 text-dark" />
      </button>

      {/* Rendered via portal so it escapes the header's stacking context */}
      {mounted && open && createPortal(overlay, document.body)}
    </>
  );
}
