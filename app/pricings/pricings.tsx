import { Card, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import getPricings from "./actions/get-pricings";
import { API_URL } from "../common/constants/api";
import Pricing from "./pricing";
import getShops from "../shops/actions/get-shops";
import getProducts from "./actions/get-products";

export default async function Pricings() {
  const pricings = await getPricings();
  const shops = await getShops();
  const products = await getProducts();

  return (
    <>
      {pricings.map((pricing, i) => {
        const shop = shops.find((o) => o.retailer_id === pricing.retailer_id);
        if (!!pricing.pricings.length) {
          return (
            <>
              <Grid container spacing={3}>
                <Grid xs={12}>
                  <Card className="p-4">
                    <Typography>{shop?.name}</Typography>
                  </Card>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                {pricing.pricings.map((price) => {
                  const product = products.find(
                    (o) => o.product_id === price.product_id
                  );
                  return (
                    <Grid key={price.price_id} sm={6} lg={4} xs={12}>
                      <Pricing
                        product={product}
                        pricing={price}
                        apiUrl={API_URL}
                        retailerId={pricing.retailer_id}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </>
          );
        }
      })}
    </>
  );
}
