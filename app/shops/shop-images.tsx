"use client";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";
import { ShopImages as SIs } from "./interfaces/shop-images.interface";
import { useEffect, useState } from "react";

interface ShopImagesProps {
  images: SIs;
  url: string | undefined;
}

export default function ShopImages({ images, url }: ShopImagesProps) {
  const [src, setSrc] = useState("");
  const [i, setI] = useState(0);

  useEffect(() => {
    setSrc(`${url}/${images[i].file.slice(7)}`);
  }, [i]);

  const backHandler = () => {
    if (i > 0) {
      setI((pervState) => {
        return pervState - 1;
      });
    } else {
      setI(images.length - 1);
    }
  };

  const forwardHandler = () => {
    if (i < images.length - 1) {
      setI((pervState) => {
        return pervState + 1;
      });
    } else {
      setI(0);
    }
  };

  return (
    <>
      <div className="relative flex">
        <Image
          src={src}
          width="0"
          height="0"
          className="w-full h-auto rounded"
          sizes="100vw"
          alt="Picture of retailer"
        />
        {images.length !== 1 ? (
          <>
            <button
              onClick={backHandler}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2"
            >
              <ArrowBackIosIcon />
            </button>
            <button
              onClick={forwardHandler}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2"
            >
              <ArrowForwardIosIcon />
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
