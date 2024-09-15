"use client";

import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreatePricingModal from "./create-pricing-modal";
import { useState } from "react";
import FileUploadModal from "./upload-pricing-image-modal";

export default function CreatePricingFab() {
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
      />
      <FileUploadModal
        open={modalImageVisible}
        handleClose={() => setModalImageVisible(false)}
        pricingId={pricingId}
      />
      <div className="fixed left-10 bottom-10">
        <Fab color="primary" onClick={() => setModalPricingVisible(true)}>
          <AddIcon />
        </Fab>
      </div>
    </>
  );
}
