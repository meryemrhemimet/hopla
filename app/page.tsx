import { HomePage } from "@/components/home-page";
import { products } from "@/data/products";
import { reviews } from "@/data/reviews";

export default function Page() {
  return <HomePage products={products} reviews={reviews} />;
}
