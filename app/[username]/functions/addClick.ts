import { ToastError } from "@/components/toast";
import { createClient } from "@/utils/supabase/client";

export const handleClick = async ({
  table,
  docId,
}: {
  table: string;
  docId: string;
}) => {
  const supabase = createClient();


  const { error } = await supabase.rpc("increment_clicks", {
    table_name: table,
    row_id: docId,
    x: 1,
  });


  if (error) {
    ToastError({ message: "Error adding subscriber." });
    return;
  }
};
