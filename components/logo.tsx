import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center text-primary-dark", className)}
      aria-label="Hopla - accueil"
    >
      <Image
        src="/images/logo-hopla-transparent.png"
        alt="Hopla"
        width={118}
        height={94}
        priority
        sizes="118px"
        className="h-14 w-auto object-contain sm:h-16"
      />
    </Link>
  );
}
