import { Card, Stack, Typography } from "@mui/material";
import { Shop as IShop } from "./interfaces/shop.interface";
import ShopImages from "./shop-images";
import { API_URL } from "../common/constants/api";

interface ShopProps {
  shop: IShop;
}

export default async function Shop({ shop }: ShopProps) {
  return (
    <Card className="p-4">
      <Stack gap={3}>
        <Typography variant="h4">{shop.name}</Typography>
        {shop.imageExists ? (
          <ShopImages images={shop.images} url={API_URL} />
        ) : (
          "No Images Found!"
        )}
        <Typography>{shop.website}</Typography>
        <Typography>${shop.location}</Typography>
      </Stack>
    </Card>
  );
}
