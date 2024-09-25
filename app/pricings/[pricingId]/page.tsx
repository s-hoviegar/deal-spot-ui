import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import getPricing from "../actions/get-pricing";
import getPricingImages from "../actions/get-pricing-images";
import { API_URL } from "@/app/common/constants/api";
import { Price, PricingError } from "../interfaces/pricing.interface";
import getProduct from "../actions/get-product";

interface SinglePricingProps {
  params: { pricingId: string };
}

export default async function SinglePricing({ params }: SinglePricingProps) {
  let pricing: Price | PricingError;
  try {
    pricing = (await getPricing(+params.pricingId)) as PricingError;
    if (pricing.statusCode === 403) {
      return (
        <>
          <Typography variant="h2">
            {pricing.message}: {pricing.statusCode}
          </Typography>
          <Typography variant="h4">
            You do not have permission to view this pricing details.
          </Typography>
        </>
      );
    } else {
      pricing = pricing as unknown as Price;
      const product = await getProduct(pricing.product_id);
      return (
        <Grid container marginBottom={"2rem"} rowGap={3}>
          {product.imageExists && (
            <Grid md={6} xs={12}>
              <Image
                src={`${API_URL}/${product.images[0].file.slice(7)}`}
                width={0}
                height={0}
                className="w-full sm:w-3/4 h-auto"
                sizes="100vw"
                alt="Picture of the pricing"
              />
            </Grid>
          )}
          <Grid md={6} xs={12}>
            <Stack gap={3}>
              <Typography variant="h2">{product.name}</Typography>
              <Typography variant="h2">
                {JSON.stringify(product.detail)}
              </Typography>
              <Typography>{pricing.availability}</Typography>
              <Typography>{pricing.sale ? "On sale" : ""}</Typography>
              <Typography variant="h4">
                {pricing.price} {pricing.currency}
              </Typography>
              <Typography variant="h4"></Typography>
            </Stack>
          </Grid>
        </Grid>
      );
    }
  } catch (err) {
    console.log(err);
  }
}
