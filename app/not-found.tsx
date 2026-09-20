import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-shell grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary-dark">404</p>
        <h1 className="heading-lg mt-2">Produit introuvable</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          Ce lien ne correspond pas à un produit du catalogue Hopla.
        </p>
        <Button asChild className="mt-7">
          <Link href="/#shop">Retour au catalogue</Link>
        </Button>
      </div>
    </div>
  );
}
