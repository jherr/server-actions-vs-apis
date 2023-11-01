import Link from "next/link";

export default function Links() {
  return (
    <ul>
      <li>
        <li className="mb-5 font-bold text-2xl">Server Actions</li>
        <li>
          <Link href="/">Server Actions - Direct To Database</Link>
        </li>
        <li>
          <Link href="/local-api-module">
            Server Actions - Local API Module
          </Link>
        </li>
        <li className="my-5 font-bold text-2xl">API</li>
        <li>
          <Link href="/client-to-local-api">
            Client Components - Local API Module
          </Link>
        </li>
        <li>
          <Link href="/client-to-msvc-proxy">
            Client Components - Microservice Proxy Through Local API
          </Link>
        </li>
        <li>
          <Link href="/client-to-msvc">
            Client Components - API Microservice Direct
          </Link>
        </li>
      </li>
    </ul>
  );
}
