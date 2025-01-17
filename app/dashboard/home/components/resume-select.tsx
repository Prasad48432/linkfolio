"use client";
import React, { useState } from "react";
import { RiImageAddLine } from "react-icons/ri";
import { FileUp, Loader, Pencil } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { ToastError, ToastSuccess } from "@/components/toast";
import { FaRegFilePdf } from "react-icons/fa6";
import ToggleSwitch from "@/components/toggleswitch";

const ResumeSection = ({
  resumeUrl,
  userId,
  resumeUrlVisibility
}: {
  resumeUrl: string;
  userId: string;
  resumeUrlVisibility: boolean;
}) => {
  const supabase = createClient();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      ToastError({ message: "Only pdf allowed." });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleFileUpload = async (file: any) => {
    setUploadLoading(true);
    try {
      if (resumeUrl) {
        const oldFilePath = resumeUrl.split(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/useresumes/`
        )[1];

        if (oldFilePath) {
          await supabase.storage
            .from("useresumes")
            .remove([`${oldFilePath}`])
            .then((result) => {
              // TODO:
            })
            .catch((err) => {
              ToastError({ message: "Delete Unsuccessfull." });
            });
        }
      }
      const fileExt = file.name.split(".").pop();
      const filePath = `${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("useresumes")
        .upload(filePath, file);

      ToastSuccess({ message: "Resume Uploaded." });

      if (error) {
        setUploadLoading(false);
        throw error;
      }

      // Get the public URL of the uploaded image
      const { data } = supabase.storage
        .from("useresumes")
        .getPublicUrl(filePath);

      const uri = await supabase
        .from("profiles")
        .update({
          resume_url: data.publicUrl,
        })
        .eq("id", userId);

      setUploadLoading(false);
      setFile(null);
    } catch (error) {
      ToastError({ message: "Some error occured." });
      setUploadLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col">
        <h1 className="text-primary-text/90 font-medium text-base lg:text-xl px-1">
          Resume Section
        </h1>
        <p className="text-primary-text/70 font-normal text-xs lg:text-sm mb-1 px-1">
          Attach your resume to showcase your experience.
        </p>
      </div>
      {resumeUrl ? (
        <div className="mt-2 w-full h-40 lg:h-36 flex items-center justify-center gap-2 rounded-md border border-dashed border-secondary-strongerborder transition-all duration-200 relative">
          {!file && (
            <div className="hidden lg:flex w-28 h-24 rounded-md overflow-hidden shadow-lg scrollbar_hidden">
              <iframe
                src={resumeUrl}
                title="PDF Preview"
                className="w-full h-full"
              />
            </div>
          )}
          <div className="flex flex-col items-center justify-center gap-1">
            {file ? (
              <p className="text-primary-text/80">
                Selected{" "}
                <span className="text-accent-text/80">{file.name}</span>
              </p>
            ) : (
              <p className="text-accent-text/90 text-sm flex items-center justify-center gap-2">
                {resumeUrl.split("/").pop()}
                <FaRegFilePdf size={15} />
              </p>
            )}

            {!file && (
              <>
                <input
                  type="file"
                  className="hidden"
                  id="fileUpload"
                  accept="application/pdf"
                  onChange={handleFileSelect}
                />
                <label
                  htmlFor="fileUpload"
                  className="text-primary-text/90 transition-all duration-200 ease-out flex items-center justify-center px-1.5 font-thin py-0.5 text-sm border rounded lg:rounded-md bg-secondary-bg hover:bg-secondary-selection border-secondary-border hover:border-secondary-strongerborder text-primary-text cursor-pointer"
                >
                  <Pencil className="mr-1" strokeWidth={1} size={13} /> edit
                </label>
              </>
            )}
            {file && (
              <button
                disabled={uploadLoading}
                onClick={() => handleFileUpload(file)}
                className={`${
                  uploadLoading
                    ? "bg-secondary-bg/70 border-secondary-border text-primary-text/60 cursor-not-allowed"
                    : "bg-secondary-bg hover:bg-secondary-selection border-secondary-border hover:border-secondary-strongerborder text-primary-text cursor-pointer"
                } relative space-x-0.5 text-center ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border focus-visible:outline-brand-600 data-[state=open]:bg-selection data-[state=open]:outline-brand-600 data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px] flex items-center justify-center`}
              >
                {uploadLoading ? (
                  <Loader className="animate-spin" strokeWidth={1} size={15} />
                ) : (
                  <FileUp strokeWidth={1} size={15} />
                )}{" "}
                <span className="mt-0.5">Update</span>
              </button>
            )}
          </div>
          <ToggleSwitch resumeUrlVisibility={resumeUrlVisibility} />
        </div>
      ) : (
        <div
          className={`mt-2 w-full h-36 flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-secondary-strongerborder transition-all duration-200 ${
            isDragging ? "bg-success-bg/70" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {!file && (
            <>
              <input
                type="file"
                className="hidden"
                id="fileUpload"
                accept="application/pdf"
                onChange={handleFileSelect}
              />
              <label
                htmlFor="fileUpload"
                className="cursor-pointer text-primary-text underline"
              >
                <RiImageAddLine className="text-primary-text/80 text-4xl md:text-5xl hover:text-gray-400 hover:border-secondary-strongerborder cursor-pointer p-2 border border-dashed border-secondary-border duration-200 transition-all ease-out" />
              </label>{" "}
            </>
          )}
          {file ? (
            <p className="text-primary-text/80">
              Selected <span className="text-accent-text/80">{file.name}</span>
            </p>
          ) : (
            <p className="text-primary-text/70">Drag & Drop or select</p>
          )}
          {file && (
            <button
              disabled={uploadLoading}
              onClick={() => handleFileUpload(file)}
              className={`${
                uploadLoading
                  ? "bg-secondary-bg/70 border-secondary-border text-primary-text/60 cursor-not-allowed"
                  : "bg-secondary-bg hover:bg-secondary-selection border-secondary-border hover:border-secondary-strongerborder text-primary-text cursor-pointer"
              } relative space-x-0.5 text-center ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border focus-visible:outline-brand-600 data-[state=open]:bg-selection data-[state=open]:outline-brand-600 data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px] flex items-center justify-center`}
            >
              {uploadLoading ? (
                <Loader className="animate-spin" strokeWidth={1} size={15} />
              ) : (
                <FileUp strokeWidth={1} size={15} />
              )}{" "}
              <span className="mt-0.5">Upload</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeSection;
