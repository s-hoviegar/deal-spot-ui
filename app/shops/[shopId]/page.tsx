import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import getShop from "../actions/get-shop";
import getShopImages from "../actions/get-shop-images";
import { API_URL } from "@/app/common/constants/api";
import { Shop, ShopError } from "../interfaces/shop.interface";

interface SingleShopProps {
  params: { shopId: string };
}

export default async function SingleShop({ params }: SingleShopProps) {
  let shop: Shop | ShopError;
  try {
    shop = (await getShop(+params.shopId)) as ShopError;
    if (shop.statusCode === 403) {
      return (
        <>
          <Typography variant="h2">
            {shop.message}: {shop.statusCode}
          </Typography>
          <Typography variant="h4">
            You do not have permission to view this shop details.
          </Typography>
        </>
      );
    } else {
      shop = shop as unknown as Shop;
      return (
        <Grid container marginBottom={"2rem"} rowGap={3}>
          {shop?.imageExists && (
            <Grid md={6} xs={12}>
              <Image
                src={`${API_URL}/${shop.images[0].file.slice(7)}`}
                width={0}
                height={0}
                className="w-full sm:w-3/4 h-auto"
                sizes="100vw"
                alt="Picture of the shop"
              />
            </Grid>
          )}
          <Grid md={6} xs={12}>
            <Stack gap={3}>
              <Typography variant="h2">{shop.name}</Typography>
              <Typography>{shop.contact_info}</Typography>
              <Typography variant="h4">Networth: €{shop.website}</Typography>
            </Stack>
          </Grid>
        </Grid>
      );
    }
  } catch (err) {
    console.log(err);
  }
}
