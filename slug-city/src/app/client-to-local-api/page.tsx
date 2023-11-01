import type { Metadata } from "next";
import { cookies } from "next/headers";

import SlugsGrid from "./SlugsGrid";

export default async function Home() {
  const activeSlugsReq = await fetch(
    "http://localhost:3000/client-to-local-api/api",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("__session")?.value}`,
      },
    }
  );
  const bookmarkedSlugsRes = (await activeSlugsReq.json()) as {
    slug: string;
  }[];

  return (
    <>
      <h1 className="text-3xl font-bold mb-3">
        Client Components - Local API Module
      </h1>

      <SlugsGrid bookmarkedSlugs={bookmarkedSlugsRes.map((row) => row.slug)} />
    </>
  );
}

export const metadata: Metadata = {
  title: "Client Components - Local API Module",
};
