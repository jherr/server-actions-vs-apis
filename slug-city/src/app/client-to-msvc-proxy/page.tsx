import type { Metadata } from "next";
import { cookies } from "next/headers";

import { getSelectedSlugs } from "@/remote-api";
import SlugsGrid from "./SlugsGrid";

export default async function Home() {
  const bookmarkedSlugs = await getSelectedSlugs(
    cookies().get("__session")?.value!
  );

  return (
    <>
      <h1 className="text-3xl font-bold mb-3">
        Client Components - Microservice Proxy Through Local API
      </h1>

      <SlugsGrid bookmarkedSlugs={bookmarkedSlugs.map((row) => row.slug)} />
    </>
  );
}

export const metadata: Metadata = {
  title: "Client Components - Microservice Proxy Through Local API",
};
