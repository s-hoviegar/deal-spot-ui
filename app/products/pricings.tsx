import Grid from "@mui/material/Unstable_Grid2/Grid2";
import getPricings from "./actions/get-pricings";
import Pricing from "./pricing";
import { API_URL } from "../common/constants/api";
import { Card, Typography } from "@mui/material";

export default async function Pricings() {
  const pricings = await getPricings();

  return (
    <>
      {pricings.map((pricing) => {
        if (!!pricing.pricings.length) {
          return (
            <>
              <Grid container spacing={3}>
                <Grid xs={12}>
                  <Card className="p-4">
                    <Typography>{pricing.retailer_id}</Typography>
                  </Card>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                {pricing.pricings.map((price) => {
                  return (
                    <Grid key={price.price_id} sm={6} lg={4} xs={12}>
                      <Pricing
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
