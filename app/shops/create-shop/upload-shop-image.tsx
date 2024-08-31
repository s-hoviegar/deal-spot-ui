"use client";
import { Grid } from "@mui/material";
import { useState } from "react";

type fileObject = {
  blob_url: string;
  type: string;
};

export default function FileUpload() {
  const [files, setFiles] = useState<fileObject[]>([]);
  const [fileEnter, setFileEnter] = useState(false);

  // Component logic goes here

  return (
    <div className="container px-4 max-w-5xl mx-auto">
      {Object.keys(files).length === 0 ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setFileEnter(true);
          }}
          onDragLeave={(e) => {
            setFileEnter(false);
          }}
          onDragEnd={(e) => {
            e.preventDefault();
            setFileEnter(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setFileEnter(false);
            console.log("event dataTransfer");
            console.log(e.dataTransfer.items);
            if (e.dataTransfer.items) {
              [...e.dataTransfer.items].forEach((item, i) => {
                if (item.kind === "file") {
                  const file = item.getAsFile();
                  if (file) {
                    let blobUrl = URL.createObjectURL(file);
                    setFiles((prevState) => [
                      ...prevState,
                      { blob_url: blobUrl, type: item.type },
                    ]);
                  }
                  console.log(`items file[${i}].name = ${file?.name}`);
                }
              });
            } else {
              [...e.dataTransfer.files].forEach((file, i) => {
                console.log(`… file[${i}].name = ${file.name}`);
              });
            }
          }}
          className={`${
            fileEnter ? "border-4" : "border-2"
          } mx-auto  bg-black flex flex-col w-full max-w-xs h-72 border-dashed items-center justify-center`}
        >
          <label
            htmlFor="files"
            className="h-full flex flex-col justify-center text-center"
          >
            Click to upload or drag and drop
          </label>
          <input
            id="files"
            type="file"
            className="hidden"
            onChange={(e) => {
              console.log(e.target.files);
              let files = e.target.files;
              if (files && files[0]) {
                let blobUrl = URL.createObjectURL(files[0]);
                setFiles((prevState) => [
                  ...prevState,
                  { blob_url: blobUrl, type: files[0].type },
                ]);
              }
            }}
          />
        </div>
      ) : (
        <div className="overflow-y-auto h-72">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setFileEnter(true);
            }}
            onDragLeave={(e) => {
              setFileEnter(false);
            }}
            onDragEnd={(e) => {
              e.preventDefault();
              setFileEnter(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setFileEnter(false);
              console.log("event dataTransfer");
              console.log(e.dataTransfer.items);
              if (e.dataTransfer.items) {
                [...e.dataTransfer.items].forEach((item, i) => {
                  if (item.kind === "file") {
                    const file = item.getAsFile();
                    if (file) {
                      let blobUrl = URL.createObjectURL(file);
                      setFiles((prevState) => [
                        ...prevState,
                        { blob_url: blobUrl, type: item.type },
                      ]);
                    }
                    console.log(`items file[${i}].name = ${file?.name}`);
                  }
                });
              } else {
                [...e.dataTransfer.files].forEach((file, i) => {
                  console.log(`… file[${i}].name = ${file.name}`);
                });
              }
            }}
            className={`${
              fileEnter ? "border-4" : "border-2"
            } mx-auto bg-black flex flex-col w-full max-w-xs border-dashed p-3`}
          >
            <input
              id="files"
              type="file"
              className="hidden"
              onChange={(e) => {
                console.log(e.target.files);
                let files = e.target.files;
                if (files && files[0]) {
                  let blobUrl = URL.createObjectURL(files[0]);
                  setFiles((prevState) => [
                    ...prevState,
                    { blob_url: blobUrl, type: files[0].type },
                  ]);
                }
              }}
            />
            <Grid container spacing={1.5}>
              {files.map((file, i) => {
                return (
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
                        <p className="text-2xl font-bold">X</p>
                      </div>
                      <object
                        className="rounded-md w-20"
                        data={file.blob_url}
                        type={file.type} //need to be updated based on type of file
                      />
                    </div>
                  </Grid>
                );
              })}
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
