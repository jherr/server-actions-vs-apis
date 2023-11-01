import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { bookmarkSlug, getSelectedSlugs } from "@/remote-api";

export async function POST(
  _req: NextRequest,
  { params: { slug } }: { params: { slug: string } }
) {
  const session = cookies().get("__session")?.value;
  await bookmarkSlug(session!, slug);
  return NextResponse.json(await getSelectedSlugs(session!));
}
