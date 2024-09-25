export interface Product {
  product_id: number;
  name: string;
  detail: JSON;
  imageExists: boolean;
  images: ProductImage[];
}

export interface ProductImage {
  product_image_id: number;
  name: string;
  product_id: number;
  file: string;
}
