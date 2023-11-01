import { auth } from "@clerk/nextjs";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import clsx from "clsx";

import { bookmarkSlug, getSelectedSlugs } from "@/sql-api";
import { SLUGS } from "@/static-data";

export default async function Home() {
  const { userId } = auth();

  if (!userId) {
    return <div>Logged out</div>;
  }

  const data = await getSelectedSlugs(userId);
  const bookmarkedSlugs = data.map((row) => row.slug);

  return (
    <>
      <h1 className="text-3xl font-bold mb-3">
        Server Actions - Local API Module
      </h1>

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
              <button
                className={clsx("text-white font-bold py-2 px-4 rounded", {
                  "bg-blue-500 hover:bg-blue-700":
                    !bookmarkedSlugs.includes(slug),
                  "bg-red-500 hover:bg-red-700 ":
                    bookmarkedSlugs.includes(slug),
                })}
                formAction={async () => {
                  "use server";
                  await bookmarkSlug(userId, slug);
                  revalidatePath("/");
                }}
              >
                {bookmarkedSlugs.includes(slug) ? "Un-Bookmark" : "Bookmark"}
              </button>
            </div>
          </div>
        ))}
      </form>
    </>
  );
}
