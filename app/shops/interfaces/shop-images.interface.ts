export interface ShopImage {
  retailer_image_id: number;
  name: string;
  retailer_id: number;
  file: string;
}

export interface ShopImages extends Array<ShopImage> {}
