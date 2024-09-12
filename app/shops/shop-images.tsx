"use client";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";
import {
  NoShopImage,
  ShopImages as SIs,
} from "./interfaces/shop-images.interface";
import { useEffect, useState } from "react";

interface ShopImagesProps {
  images: SIs | NoShopImage;
  url: string;
}

export default function ShopImages({ images, url }: ShopImagesProps) {
  const [src, setSrc] = useState("");
  const [i, setI] = useState(0);
  const [hasImage, setHasImage] = useState(false);
  const [allImages, setAllImages] = useState<SIs>([]);

  let error;

  // console.log(images);
  // console.log(JSON.stringify(images.images.statusCode));

  useEffect(() => {
    error = images as NoShopImage;
    if (error.statusCode === 404) {
      // console.log("no image");
      setHasImage(false);
    } else {
      // console.log("image found");
      setHasImage(true);
      setAllImages(images as SIs);
      // console.log(allImages);
    }
  }, [i]);

  useEffect(() => {
    if (hasImage) setSrc(`${url}/${allImages[i].file.slice(7)}`);
  }, [hasImage, i]);

  const backHandler = () => {
    if (i > 0) {
      setI((pervState) => {
        return pervState - 1;
      });
    } else {
      setI(allImages.length - 1);
    }
  };

  const forwardHandler = () => {
    if (i < allImages.length - 1) {
      setI((pervState) => {
        return pervState + 1;
      });
    } else {
      setI(0);
    }
  };

  return (
    <>
      {hasImage ? (
        <div className="relative flex">
          <Image
            src={src}
            width="0"
            height="0"
            className="w-full h-auto rounded"
            sizes="100vw"
            alt="Picture of retailer"
          />
          {allImages.length !== 1 ? (
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
      ) : (
        "No Images found"
      )}
    </>
  );
}
