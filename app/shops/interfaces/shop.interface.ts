export interface Shop {
  retailer_id: number;
  name: string;
  website: string;
  contact_info: string;
  location: string;
  address: string;
  average_rating: number;
  imageExists: boolean;
  images: ShopImage[];
}

export interface ShopImage {
  retailer_image_id: number;
  name: string;
  retailer_id: number;
  file: string;
}

export interface ShopError {
  statusCode: number;
  message: string;
}
