import { Card, Typography } from "@mui/material";
import { Shop as IShop } from "./interfaces/shop.interface";
import ShopImages from "./shop-images";
import getShopImages from "./actions/get-shop-images";
import { API_URL } from "../common/constants/api";

interface ShopProps {
  shop: IShop;
}

export default async function Shop({ shop }: ShopProps) {
  const shopImages = await getShopImages(shop.retailer_id);

  return (
    <Card className="p-4">
      <ShopImages images={shopImages} url={API_URL} />
      <Typography variant="h4">{shop.name}</Typography>
      <Typography>{shop.website}</Typography>
      <Typography>${shop.location}</Typography>
    </Card>
  );
}
