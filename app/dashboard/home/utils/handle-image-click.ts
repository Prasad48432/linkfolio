import { ToastError, ToastSuccess } from "@/components/toast";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

export const handleImageClick = async ({
  simage,
  image,
  setModal,
}: {
  simage: string;
  image: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (image !== `/avatars/${simage}.png`) {
      const oldFilePath = image.split(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/userimages/userimages/`
      )[1];


      if (oldFilePath) {
        await supabase.storage
          .from("userimages")
          .remove([`userimages/${oldFilePath}`])
          .then((result) => {
            // TODO:
          })
          .catch((err) => {
            ToastError({message: "An unexpected error occurred."})
          });
      }

      const uri = await supabase
        .from("profiles")
        .update({
          avatar_url: `/avatars/${simage}.png`,
        })
        .eq("id", user?.id);

      setModal(false);
      ToastSuccess({message:"Image updated."})
    }
  } catch (error) {
    ToastError({message: "An unexpected error occurred."})
  }
};
