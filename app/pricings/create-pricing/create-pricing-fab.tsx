"use client";

import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreatePricingModal from "./create-pricing-modal";
import { useState } from "react";
import FileUploadModalProduct from "./upload-product-image";
import { Product } from "../interfaces/product.interface";
import { Shop } from "../../shops/interfaces/shop.interface";
import { Category } from "../interfaces/category.interface";

interface CreatePricingFabProps {
  products: Product[];
  shops: Shop[];
  categories: Category[];
}

export default function CreatePricingFab({
  products,
  shops,
  categories,
}: CreatePricingFabProps) {
  const [modalPricingVisible, setModalPricingVisible] = useState(false);
  const [modalImageVisible, setModalImageVisible] = useState(false);
  const [pricingId, setPricingId] = useState<number>(0);

  return (
    <>
      <CreatePricingModal
        open={modalPricingVisible}
        setModalImageVisible={setModalImageVisible}
        handleClose={() => {
          setModalPricingVisible(false);
        }}
        setPricingId={setPricingId}
        products={products}
        shops={shops}
        categories={categories}
      />
      <div className="fixed left-10 bottom-10">
        <Fab color="primary" onClick={() => setModalPricingVisible(true)}>
          <AddIcon />
        </Fab>
      </div>
    </>
  );
}
