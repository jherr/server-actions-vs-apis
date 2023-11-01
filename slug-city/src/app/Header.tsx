import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <div className="flex justify-between mt-3 border-b-orange-600 border-b-2 py-2 align-middle">
      <UserButton afterSignOutUrl="/" />
      <Link href="/links">Links</Link>
    </div>
  );
}
