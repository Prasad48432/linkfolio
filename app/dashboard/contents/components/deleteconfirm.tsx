"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Loader } from "lucide-react";
import { ToastError, ToastSuccess } from "@/components/toast";
import { createClient } from "@/utils/supabase/client";

const DeleteConfirmation = ({
  modal,
  setModal,
  object,
  table,
}: {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  object: any;
  table: string;
}) => {
  const supabase = createClient();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async (object: any) => {
    setDeleteLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Step 1: Get the deleted object's index
      const deletedIndex = object.index;

      // Step 2: Delete the entry
      const { data: deleteData, error: deleteError } = await supabase
        .from(table)
        .delete()
        .eq("id", object.id);

      if (deleteError) {
        ToastError({
          message: "An unexpected error occurred.",
        });
        return;
      }

      // Step 3: Update indices for remaining entries
      const { data: remainingEntries, error: fetchError } = await supabase
        .from(table)
        .select("id, index")
        .gt("index", deletedIndex) // Fetch entries with a higher index than the deleted one
        .order("index", { ascending: true })
        .eq("user_id", user?.id);

      if (fetchError) {
        ToastError({
          message: "Failed to fetch remaining entries.",
        });
        return;
      }


      // call broadcast if deleted last item
      if (remainingEntries.length === 0) {
        try {
          const response = await supabase.channel("max-index-delete").send({
            type: "broadcast",
            event: "deleted_max_index_item",
            payload: {
              id: object.id,
              table: table,
            },
          });
        } catch (error) {
          ToastError({
            message: "Failed to refresh page.",
          });
        }
      }

      // Step 4: Update the indices
      for (const entry of remainingEntries) {
        await supabase
          .from(table)
          .update({ index: entry.index - 1 }) // Decrement the index by 1
          .eq("id", entry.id);
      }

      ToastSuccess({ message: "Deleted successfully." });
    } catch (error) {
      console.log(error);
      ToastError({
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setDeleteLoading(false);
      setModal(false);
    }
  };

  return (
    <AnimatePresence>
      {modal && (
        <div
          className="px-5 z-[100] fixed h-full w-full flex items-center justify-center top-0 left-0 bg-black/20 backdrop-blur"
          style={{ pointerEvents: "auto" }}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -50,
              opacity: 0,
            }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
            className="relative z-50 w-full border border-secondary-border bg-primary-bg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-[0%] data-[state=closed]:slide-out-to-top-[0%] data-[state=open]:slide-in-from-left-[0%] data-[state=open]:slide-in-from-top-[0%] sm:rounded-lg md:w-full bg-dash-sidebar sm:align-middle sm:w-full sm:max-w-sm p-0 gap-0 pb-5 !block"
            style={{ pointerEvents: "auto" }}
          >
            <div className="flex flex-col gap-1.5 text-center sm:text-left py-4 px-5 border-b border-secondary-border">
              <h2 className="text-base leading-none font-normal">
                <span className="break-words">Confirm Delete</span>
              </h2>
            </div>
            <div className="py-4 px-5 overflow-hidden">
              <div className="space-y-4">
                <p className="text-sm text-foreground-light">
                  Are you sure? you want to delete{" "}
                  <span className="font-semibold text-accent-text">
                    {table === "links" ? object.title : object.name}
                  </span>
                </p>
              </div>
            </div>
            <div className="w-full h-px bg-border" />
            <div className="flex gap-2 px-5 pt-5">
              <button
                onClick={() => setModal(false)}
                data-size="medium"
                type="button"
                className="relative cursor-pointer space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border border-secondary-border text-primary-text hover:bg-secondary-selection bg-secondary-bg hover:border-secondary-strongerborder focus-visible:outline-brand-600 data-[state=open]:bg-selection data-[state=open]:outline-brand-600 data-[state=open]:border-button-hover w-full flex items-center justify-center text-sm px-4 py-2 h-[38px]"
              >
                {" "}
                <span className="truncate">Cancel</span>{" "}
              </button>
              <button
                data-size="medium"
                type="submit"
                onClick={() => handleDelete(object)}
                className={`relative cursor-pointer space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border border-danger-border ${
                  !deleteLoading &&
                  "hover:bg-danger-selection hover:border-danger-strongerborder"
                } text-primary-text bg-danger-bg data-[state=open]:border-destructive data-[state=open]:bg-destructive-400 dark:data-[state=open]:bg-destructive-/50 data-[state=open]:outline-destructive w-full flex items-center justify-center text-sm px-4 py-2 h-[38px] truncate`}
              >
                {deleteLoading ? (
                  <Loader size={20} strokeWidth={1} className="animate-spin" />
                ) : (
                  <span className="truncate">Delete</span>
                )}
              </button>
            </div>
            <button
              onClick={() => setModal(false)}
              type="button"
              className="absolute right-4 top-4 rounded-sm opacity-20 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none  disabled:pointer-events-none "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x h-4 w-4"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmation;
