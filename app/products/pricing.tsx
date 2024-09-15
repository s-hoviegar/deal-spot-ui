"use client";

import { Card, CardActionArea, Stack, Typography } from "@mui/material";
import { Pricing as IPricing } from "./interfaces/pricing.interface";
import PricingImages from "./pricing-images";
import { useRouter } from "next/navigation";

interface PricingProps {
  pricing: IPricing;
  apiUrl: string | undefined;
  retailerId: number;
}

export default function Pricing({ pricing, apiUrl, retailerId }: PricingProps) {
  const router = useRouter();

  return (
    <CardActionArea onClick={() => router.push(`/pricings/${retailerId}`)}>
      <Card className="p-4">
        <Stack gap={3}>
          <Typography variant="h4">{pricing.product_id}</Typography>
          {/* {pricing.imageExists ? (
            <PricingImages images={pricing.images} url={apiUrl} />
          ) : (
            "No Images Found!"
          )} */}
          <Typography>{pricing.availability}</Typography>
          <Typography>
            {pricing.currency} {pricing.price}
          </Typography>
        </Stack>
      </Card>
    </CardActionArea>
  );
}
