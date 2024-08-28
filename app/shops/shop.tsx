import { Card, Typography } from "@mui/material";
import { Shop as IShop } from "./interfaces/shop.interface";

interface ShopProps {
  shop: IShop;
}

export default function Shop({ shop }: ShopProps) {
  return (
    <Card className="p-4">
      <Typography variant="h4">{shop.name}</Typography>
      <Typography>{shop.website}</Typography>
      <Typography>${shop.location}</Typography>
    </Card>
  );
}
