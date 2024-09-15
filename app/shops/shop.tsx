"use client";

import { Card, CardActionArea, Stack, Typography } from "@mui/material";
import { Shop as IShop } from "./interfaces/shop.interface";
import ShopImages from "./shop-images";
import { useRouter } from "next/navigation";

interface ShopProps {
  shop: IShop;
  apiUrl: string | undefined;
}

export default function Shop({ shop, apiUrl }: ShopProps) {
  const router = useRouter();

  return (
    <CardActionArea onClick={() => router.push(`/shops/${shop.retailer_id}`)}>
      <Card className="p-4">
        <Stack gap={3}>
          <Typography variant="h4">{shop.name}</Typography>
          {shop.imageExists ? (
            <ShopImages images={shop.images} url={apiUrl} />
          ) : (
            "No Images Found!"
          )}
          <Typography>{shop.website}</Typography>
          <Typography>${shop.location}</Typography>
        </Stack>
      </Card>
    </CardActionArea>
  );
}
