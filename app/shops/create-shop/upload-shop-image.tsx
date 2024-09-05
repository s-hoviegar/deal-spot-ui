"use client";
import { Alert, Button, Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";

type fileObject = {
  blob_url: string;
  type: string;
};

export default function FileUpload() {
  const [files, setFiles] = useState<fileObject[]>([]);
  const [fileEnter, setFileEnter] = useState(false);
  const [fileError, setFileError] = useState(false);

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  // Component logic goes here
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    setFileError(false);
    let files = e.target.files;
    if (files && files[0]) {
      Array.prototype.forEach.call(files, function (file) {
        let blobUrl = URL.createObjectURL(file);
        setFiles((prevState) => [
          ...prevState,
          { blob_url: blobUrl, type: file.type },
        ]);
      });
    }
  };

  const divOnDragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileEnter(true);
    setFileError(false);
  };

  const divOnDragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileEnter(false);
    setFileError(false);
  };

  const divOnDragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileEnter(false);
    setFileError(false);
  };

  const divOnDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileEnter(false);
    setFileError(false);
    console.log("event dataTransfer");
    console.log(e.dataTransfer.items);
    if (e.dataTransfer.items) {
      Array.prototype.forEach.call(e.dataTransfer.items, function (item, i) {
        const file = item.getAsFile();
        if (file.type.toLowerCase().startsWith("image/")) {
          if (file) {
            let blobUrl = URL.createObjectURL(file);
            setFiles((prevState) => [
              ...prevState,
              { blob_url: blobUrl, type: item.type },
            ]);
          }
          console.log(`items file[${i}].name = ${file?.name}`);
        } else {
          setFileError(true);
        }
      });
    } else {
      Array.prototype.forEach.call(e.dataTransfer.files, function (file, i) {
        console.log(`... file[${i}].name = ${file?.name}`);
      });
    }
  };

  return (
    <div className="container px-4 max-w-5xl mx-auto">
      {fileError ? (
        <Alert severity="error">
          Oops! File(s) are not supported. Try again with JPEG, PNG, GIF.
        </Alert>
      ) : (
        ""
      )}
      {Object.keys(files).length === 0 ? (
        <div
          onDragOver={divOnDragOverHandler}
          onDragLeave={divOnDragLeaveHandler}
          onDragEnd={divOnDragEndHandler}
          onDrop={divOnDropHandler}
          className={`${
            fileEnter ? "border-4" : "border-2"
          } mx-auto bg-black flex flex-col w-full max-w-xs h-72 border-dashed items-center justify-center`}
        >
          <label
            htmlFor="files_empty"
            className="h-full flex flex-col justify-center text-center"
          >
            Click to upload or drag and drop
          </label>
          <input
            id="files_empty"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={inputChangeHandler}
          />
        </div>
      ) : (
        <div className="overflow-y-auto h-72">
          <div
            onDragOver={divOnDragOverHandler}
            onDragLeave={divOnDragLeaveHandler}
            onDragEnd={divOnDragEndHandler}
            onDrop={divOnDropHandler}
            className={`${
              fileEnter ? "border-4" : "border-2"
            } mx-auto bg-black flex flex-col w-full max-w-xs border-dashed p-3`}
          >
            <input
              id="files"
              type="file"
              accept="image/*"
              ref={hiddenFileInput}
              multiple={true}
              className="hidden"
              onChange={inputChangeHandler}
            />
            <Grid container spacing={1.5}>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  onClick={() => {
                    hiddenFileInput.current?.click();
                  }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
            <div className="opacity-0">/</div>
            <Grid container spacing={1.5}>
              {files.map((file, i) => (
                <Grid key={i} item xs={4}>
                  <div
                    className="hover:!opacity-50 cursor-not-allowed relative z-0"
                    onClick={() => {
                      const newArray = [
                        ...files.slice(0, i),
                        ...files.slice(i + 1),
                      ];
                      setFiles(newArray);
                    }}
                  >
                    <div className="absolute opacity-0 hover:!opacity-100 inset-0 flex justify-center items-center z-10">
                      <p className="text-2xl font-bold drop-shadow-[0_4px_0.2px_rgba(0,0,0,0.8)]">
                        X
                      </p>
                    </div>
                    <object
                      className="rounded-md w-20"
                      data={file.blob_url}
                      type={file.type} //need to be updated based on type of file
                    />
                  </div>
                </Grid>
              ))}
            </Grid>
            <button
              onClick={() => setFiles([])}
              className="px-4 mt-10 uppercase py-2 tracking-widest outline-none bg-red-600 text-white rounded"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
