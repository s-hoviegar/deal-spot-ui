import Grid from "@mui/material/Unstable_Grid2/Grid2";
import getShops from "./actions/get-shops";
import Shop from "./shop";

export default async function Shops() {
  const shops = await getShops();

  return (
    <>
      <Grid container spacing={3} sx={{ height: "85vh", overflow: "scroll" }}>
        {shops.map((shop) => (
          <Grid key={shop.retailer_id} sm={6} lg={4} xs={12}>
            <Shop shop={shop} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
