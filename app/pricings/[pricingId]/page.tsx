import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import getPricing from "../actions/get-pricing";
import getPricingImages from "../actions/get-pricing-images";
import { API_URL } from "@/app/common/constants/api";
import { Pricing, PricingError } from "../interfaces/pricing.interface";

interface SinglePricingProps {
  params: { pricingId: string };
}

export default async function SinglePricing({ params }: SinglePricingProps) {
  let pricing: Pricing | PricingError;
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
      pricing = pricing as unknown as Pricing;
      return (
        <Grid container marginBottom={"2rem"} rowGap={3}>
          {pricing?.imageExists && (
            <Grid md={6} xs={12}>
              <Image
                src={`${API_URL}/${(
                  await getPricingImages(pricing.retailer_id)
                )[0].file.slice(7)}`}
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
              <Typography variant="h2">{pricing.name}</Typography>
              <Typography>{pricing.contact_info}</Typography>
              <Typography variant="h4">Networth: €{pricing.website}</Typography>
            </Stack>
          </Grid>
        </Grid>
      );
    }
  } catch (err) {
    console.log(err);
  }
}
