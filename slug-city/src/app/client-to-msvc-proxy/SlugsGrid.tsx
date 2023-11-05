"use client";
import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

import { SLUGS } from "@/static-data";

export default function SlugsGrid({
  bookmarkedSlugs: initialBookmarkedSlugs,
}: {
  bookmarkedSlugs: string[];
}) {
  const [updatedBookmarks, setUpdatedBookmarks] = useState<string[]>();

  const bookmarkedSlugs = updatedBookmarks || initialBookmarkedSlugs;

  const toggleBookmark = async (slug: string) => {
    const req = await fetch(`/client-to-msvc-proxy/api/${slug}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    const res = await req.json();
    setUpdatedBookmarks(res.map((row: { slug: string }) => row.slug));
  };

  return (
    <div className="flex flex-wrap">
      {SLUGS.map(({ slug, name }) => (
        <div
          className="max-w-sm rounded overflow-hidden shadow-lg px-6 py-4"
          key={slug}
        >
          <Image
            className="w-full rounded-lg"
            src={`/${slug}.png`}
            alt={name}
            width={1024}
            height={1024}
          />
          <div>
            <div className="font-bold text-xl my-2">{name}</div>
            <button
              className={clsx("text-white font-bold py-2 px-4 rounded", {
                "bg-blue-500 hover:bg-blue-700":
                  !bookmarkedSlugs.includes(slug),
                "bg-red-500 hover:bg-red-700 ": bookmarkedSlugs.includes(slug),
              })}
              onClick={() => toggleBookmark(slug)}
            >
              {bookmarkedSlugs.includes(slug) ? "Un-Bookmark" : "Bookmark"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
