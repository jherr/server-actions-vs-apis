import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { getSelectedSlugs } from "@/sql-api";

export async function GET() {
  return NextResponse.json(await getSelectedSlugs(auth().userId!));
}
