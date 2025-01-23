"use client";
import React, { useState } from "react";
import Image from "next/image";
import useWindowSize from "@/hooks/useWindowSize";
import { Globe, GripVertical, Link, Trash } from "lucide-react";
import DeleteConfirmation from "./deleteconfirm";

type HandleFieldChange = (params: {
  id: string;
  field: string;
  value: any;
}) => void;

interface LinkCardProps {
  link: any; // Replace `any` with the specific type of your link if possible
  handleFieldChange: HandleFieldChange;
}

const LinkCard = ({ link, handleFieldChange }: LinkCardProps) => {
  const size = useWindowSize();
  const [deleteModel, setDeleteModel] = useState(false);
  return (
    <>
      <DeleteConfirmation
        modal={deleteModel}
        setModal={setDeleteModel}
        object={link}
        table="links"
      />
      <div className="w-full h-fit rounded-md bg-secondary-bg flex flex-col items-center justify-center text-primary-text px-2 py-2 relative">
        <span title="Drag handle" className="absolute top-2 lg:top-3 left-2 lg:left-3">
          <GripVertical size={18} />
        </span>
        <div className="flex items-center justify-end w-[95%] gap-2">
          <div className="w-16 h-full p-1.5 rounded-full">
            <Image
              src={`https://www.google.com/s2/favicons?sz=128&domain_url=${link.link}`}
              title={link.title}
              alt={link.title}
              width={600}
              height={600}
              className="rounded-full w-full h-full mr-4 border border-dashed p-0.5 object-cover"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-1 w-[calc(100%-6rem)] lg:w-[calc(100%-7rem)]">
            <div className="relative w-full">
              <span
                title="Link"
                className="absolute top-[55%] -translate-y-1/2 left-2 lg:left-3 flex items-center"
              >
                <Link
                  strokeWidth={1}
                  size={size.width > 1000 ? 20 : 15}
                  className="text-primary-text/80 text-xl"
                />
              </span>
              <input
                type="text"
                name="link_text"
                value={link.link}
                readOnly
                className="border-secondary-border cursor-not-allowed w-full py-2 pl-[1.75rem] lg:pl-10 text-xs lg:text-sm bg-primary-bg/70 border focus:outline-none rounded-md mt-1 truncate overflow-hidden text-ellipsis whitespace-nowrap"
              />
            </div>
            <div className="relative w-full">
              <span
                title="Link text"
                className="absolute top-[55%] -translate-y-1/2 left-2 lg:left-3 flex items-center"
              >
                <Globe
                  strokeWidth={1}
                  size={size.width > 1000 ? 20 : 15}
                  className="text-primary-text/80 text-xl"
                />
              </span>
              <input
                type="text"
                name="link_title"
                value={link.title}
                onChange={(e) =>
                  handleFieldChange({
                    id: link.id,
                    field: "title",
                    value: e.target.value,
                  })
                }
                className="border-secondary-border w-full py-2 pl-[1.75rem] lg:pl-10 text-xs lg:text-sm bg-primary-bg/70 border focus:outline-none rounded-md mt-1"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 w-[2rem] lg:w-[3rem]">
            <span className="text-ms lg:text-sm">Delete</span>
            <div
              onClick={() => {
                setDeleteModel(true);
              }}
              className="w-6 lg:w-8 h-6 lg:h-8 bg-danger-selection border-danger-border border rounded-full flex items-center justify-center cursor-pointer"
            >
              <Trash strokeWidth={1} size={size.width > 1000 ? 18 : 12} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LinkCard;
