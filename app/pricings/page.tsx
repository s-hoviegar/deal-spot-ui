import Pricings from "./pricings";
import CreatePricingFab from "./create-pricing/create-pricing-fab";
import getShops from "../shops/actions/get-shops";
import getProducts from "./actions/get-products";
import getCategories from "./actions/get-categories";

export default async function PricingPage() {
  const products = await getProducts();
  const shops = await getShops();
  const categories = await getCategories();

  return (
    <>
      <Pricings />
      <CreatePricingFab
        products={products}
        shops={shops}
        categories={categories}
      />
    </>
  );
}
