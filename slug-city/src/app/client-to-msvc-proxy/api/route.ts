import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSelectedSlugs } from "@/remote-api";

export async function GET() {
  return NextResponse.json(
    await getSelectedSlugs(cookies().get("__session")?.value!)
  );
}
