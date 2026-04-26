"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Week8LandingPage() {
  const { user, loading, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleSignIn = async () => {
    await gitHubSignIn();
  };

  const handleSignOut = async () => {
    await firebaseSignOut();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-white px-6 py-16">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold text-slate-900">
          Shopping List App
        </h1>

        {loading ? (
          <p className="text-lg text-slate-600">Checking your session...</p>
        ) : user ? (
          <>
            <p className="text-lg text-slate-700">
              Welcome, {user.displayName} ({user.email})
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/week-10/shopping-list"
                className="rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Go to Shopping List
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-md bg-slate-700 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-lg text-slate-600">
              Sign in with GitHub to access your shopping list.
            </p>
            <button
              type="button"
              onClick={handleSignIn}
              className="rounded-md bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-black"
            >
              Login with GitHub
            </button>
          </>
        )}
      </div>
    </main>
  );
}
