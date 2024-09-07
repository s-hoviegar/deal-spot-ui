"use client";

import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateShopModal from "./create-shop-modal";
import { useState } from "react";
import FileUploadModal from "./upload-shop-image-modal";

export default function CreateShopFab() {
  const [modalShopVisible, setModalShopVisible] = useState(false);
  const [modalImageVisible, setModalImageVisible] = useState(false);
  const [shopId, setShopId] = useState<number>(0);

  return (
    <>
      <CreateShopModal
        open={modalShopVisible}
        setModalImageVisible={setModalImageVisible}
        handleClose={() => {
          setModalShopVisible(false);
        }}
        setShopId={setShopId}
      />
      <FileUploadModal
        open={modalImageVisible}
        handleClose={() => setModalImageVisible(false)}
        shopId={shopId}
      />
      <div className="absolute left-10 bottom-10">
        <Fab color="primary" onClick={() => setModalShopVisible(true)}>
          <AddIcon />
        </Fab>
      </div>
    </>
  );
}
