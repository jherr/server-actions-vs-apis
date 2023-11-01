import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { bookmarkSlug, getSelectedSlugs } from "@/sql-api";

export async function POST(
  _req: NextRequest,
  { params: { slug } }: { params: { slug: string } }
) {
  await bookmarkSlug(auth().userId!, slug);
  return NextResponse.json(await getSelectedSlugs(auth().userId!));
}
