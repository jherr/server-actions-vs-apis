import type { SlugRecord } from "./types";

export const getSelectedSlugs = (token: string): Promise<SlugRecord[]> =>
  fetch("http://localhost:8080", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const bookmarkSlug = (
  token: string,
  slug: string
): Promise<SlugRecord[]> =>
  fetch(`http://localhost:8080/${slug}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  }).then((res) => res.json());
