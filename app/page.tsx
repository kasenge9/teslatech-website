"use client";

import React from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans p-8">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold mb-4">Kenya Insights Blog</h1>
        <p className="text-lg text-gray-600">
          Latest news, trends, and stories from across Kenya
        </p>
      </header>

      {/* Featured Articles */}
      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <article className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-bold mb-2">Politics Today</h2>
          <p className="text-gray-600 mb-4">
            Explore the latest updates on Kenyan politics and government initiatives.
          </p>
          <a
            href="#"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Read More →
          </a>
        </article>

        <article className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-bold mb-2">Tech & Innovation</h2>
          <p className="text-gray-600 mb-4">
            Discover the newest tech startups and innovations emerging in Kenya.
          </p>
          <a
            href="#"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Read More →
          </a>
        </article>

        <article className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-bold mb-2">Culture & Lifestyle</h2>
          <p className="text-gray-600 mb-4">
            Dive into Kenyan culture, lifestyle trends, and travel experiences.
          </p>
          <a
            href="#"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Read More →
          </a>
        </article>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500 text-sm">
        © 2025 Kenya Insights Blog • Built with ❤️ by Eng. Brian Mwendwa
      </footer>
    </main>
  );
}


