"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <button
        onClick={() => signIn("google")}
        className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold"
      >
        🔐 Login dengan Google
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm">
        {session.user?.name}
      </span>

      <button
        onClick={() => signOut()}
        className="bg-red-600 text-white px-4 py-2 rounded-xl"
      >
        Logout
      </button>
    </div>
  );
}