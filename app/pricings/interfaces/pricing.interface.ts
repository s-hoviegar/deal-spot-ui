export interface Pricings {
  retailer_id: number;
  pricings: Pricing[];
}

export interface Pricing {
  price_id: number;
  product_id: number;
  price: number;
  currency: string;
  sale: boolean;
  availability: string;
}

export interface PricingImage {
  retailer_image_id: number;
  name: string;
  retailer_id: number;
  file: string;
}

export interface PricingError {
  statusCode: number;
  message: string;
}
