import postgres from "postgres";

import type { SlugRecord } from "./types";

export const sql = postgres(process.env.POSTGRES_URL!, {});

export const getSelectedSlugs = (userId: string): Promise<SlugRecord[]> =>
  sql`SELECT * FROM bookmarks WHERE userId = ${userId} AND active = true`;

export const bookmarkSlug = (userId: string, slug: string): Promise<unknown> =>
  sql`INSERT INTO bookmarks (userId, slug)
  VALUES(${userId}, ${slug})
  ON CONFLICT (userId, slug)
  DO UPDATE SET active = NOT bookmarks.active`;
