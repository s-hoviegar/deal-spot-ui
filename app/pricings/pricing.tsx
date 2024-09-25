"use client";

import { Card, CardActionArea, Stack, Typography } from "@mui/material";
import { Pricing as IPricing } from "./interfaces/pricing.interface";
import PricingImages from "./pricing-images";
import { useRouter } from "next/navigation";
import { Product } from "./interfaces/product.interface";

interface PricingProps {
  product: Product | undefined;
  pricing: IPricing;
  apiUrl: string | undefined;
  retailerId: number;
}

export default function Pricing({
  product,
  pricing,
  apiUrl,
  retailerId,
}: PricingProps) {
  const router = useRouter();

  return (
    <CardActionArea
      onClick={() => router.push(`/pricings/${pricing.price_id}`)}
    >
      <Card className="p-4">
        <Stack gap={3}>
          <Typography variant="h4">{product?.name}</Typography>
          {product?.imageExists ? (
            <PricingImages images={product.images} url={apiUrl} />
          ) : (
            "No Images Found!"
          )}
          <Typography>{pricing.availability}</Typography>
          <Typography>
            {pricing.currency} {pricing.price}
          </Typography>
        </Stack>
      </Card>
    </CardActionArea>
  );
}
