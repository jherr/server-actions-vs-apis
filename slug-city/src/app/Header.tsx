"use client";
import Link from "next/link";
import { UserButton, SignInButton, useAuth } from "@clerk/nextjs";

export default function Header() {
  const { userId } = useAuth();
  return (
    <div className="flex justify-between mt-3 border-b-orange-600 border-b-2 py-2 align-middle">
      {userId && (
        <>
          <UserButton afterSignOutUrl="/" />
          <Link href="/links">Links</Link>
        </>
      )}
      {!userId && <SignInButton />}
    </div>
  );
}
