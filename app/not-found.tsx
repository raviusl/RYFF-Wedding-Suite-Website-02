import Link from "next/link";

import { DrapeAtmosphere } from "@/components/layout/drape-atmosphere";
import { wedding } from "@/content/wedding";

export default function NotFound() {
  return (
    <>
      <DrapeAtmosphere />
      <main className="relative z-10 flex min-h-svh flex-col items-center justify-center px-6 text-center">
        <p className="font-script text-5xl text-ivory">
          {wedding.groom} & {wedding.bride}
        </p>
        <div className="mx-auto mt-8 h-px w-10 bg-rose/35" />
        <p className="prose-soft mx-auto mt-8">This page could not be found.</p>
        <Link href="/" className="cta mt-10">
          Return
        </Link>
      </main>
    </>
  );
}
