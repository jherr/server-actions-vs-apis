import type { Metadata } from "next";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import clsx from "clsx";

import { sql } from "@/sql-api";
import { SLUGS } from "@/static-data";

export default async function Home() {
  const { userId } = auth();

  const bookmarkedSlugs = userId
    ? (
        await sql`SELECT * FROM bookmarks WHERE userId = ${userId} AND active = true`
      ).map((row) => row.slug)
    : [];

  return (
    <>
      <h1 className="text-3xl font-bold mb-3">
        Server Actions - Direct To Database
      </h1>
      {!userId && (
        <div className="text-2xl my-3 text-center">
          Sign in to start bookmarking your favorite slugs
        </div>
      )}
      <form className="flex flex-wrap">
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
              {userId && (
                <button
                  className={clsx("text-white font-bold py-2 px-4 rounded", {
                    "bg-blue-500 hover:bg-blue-700":
                      !bookmarkedSlugs.includes(slug),
                    "bg-red-500 hover:bg-red-700 ":
                      bookmarkedSlugs.includes(slug),
                  })}
                  formAction={async () => {
                    "use server";

                    await sql`INSERT INTO bookmarks (userId, slug)
                  VALUES(${userId}, ${slug})
                  ON CONFLICT (userId, slug)
                  DO UPDATE SET active = NOT bookmarks.active`;

                    revalidatePath("/");
                  }}
                >
                  {bookmarkedSlugs.includes(slug) ? "Un-Bookmark" : "Bookmark"}
                </button>
              )}
            </div>
          </div>
        ))}
      </form>
    </>
  );
}

export const metadata: Metadata = {
  title: "Server Actions - Direct To Database",
};
