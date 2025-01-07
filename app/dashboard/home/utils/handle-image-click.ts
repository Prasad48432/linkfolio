import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

export const handleImageClick = async ({
  simage,
  image,
  setModal,
  fecthProfile,
}: {
  simage: string;
  image: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  fecthProfile: any;
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

      console.log(`Old Image ${oldFilePath}`);

      console.log(`New Image ${simage}`);

      if (oldFilePath) {
        await supabase.storage
          .from("userimages")
          .remove([`userimages/${oldFilePath}`])
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      const uri = await supabase
        .from("profiles")
        .update({
          avatar_url: `/avatars/${simage}.png`,
        })
        .eq("id", user?.id);

      fecthProfile();

      setModal(false);
      toast.success("Image updated.", {
        duration: 1000,
        style: {
          background: "#1a1a1a",
          color: "#89e15a",
          border: "1px solid #363636",
        },
      });
    }
  } catch (error) {
    toast.error(`${error}`);
  }
};
