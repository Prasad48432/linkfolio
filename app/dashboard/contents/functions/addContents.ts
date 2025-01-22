import { ToastError, ToastSuccess } from "@/components/toast";
import { SupabaseClient } from "@supabase/supabase-js";

export const handleAdd = async ({
  table,
  value,
  supabase,
  setAddLoading,
  setToggles,
  setValues,
}: {
  table: string;
  value: string;
  supabase: SupabaseClient<any, "public", any>;
  setAddLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setToggles: React.Dispatch<
    React.SetStateAction<{
      startupAdd: boolean;
      linkAdd: boolean;
      projectAdd: boolean;
    }>
  >;
  setValues: React.Dispatch<
    React.SetStateAction<{
      startupAdd: string;
      linkAdd: string;
      projectAdd: string;
    }>
  >;
}) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const userId = user?.id;

    if (!userId) return;

    if (value === "") {
      ToastError({ message: "Enter a valid link" });
      return;
    }

    let exists = false;
    let secureValue = `https://${value}`;
    const regex = /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/;

    if (!regex.test(secureValue)) {
      ToastError({ message: "Invalid secure value" });
      return;
    }

    setAddLoading(true);

    // Query the respective table based on the conditions
    if (table === "startups") {
      const { data } = await supabase
        .from("startups")
        .select("website")
        .eq("website", secureValue)
        .eq("verified", true);

      exists = (data && data.length > 0) || false;
    } else if (table === "links") {
      const { data } = await supabase
        .from("links")
        .select("link")
        .eq("link", secureValue);

      exists = (data && data.length > 0) || false;
    } else if (table === "projects") {
      const { data } = await supabase
        .from("projects")
        .select("github_link, website_link")
        .or(`github_link.eq.${secureValue},website_link.eq.${secureValue}`);

      exists = (data && data.length > 0) || false;
    }

    if (exists) {
      ToastError({ message: "Value already exists in the database." });
      setAddLoading(false);
      return;
    }

    if (table === "startups") {
      const { data: maxIndexData, error: maxIndexError } = await supabase
        .from("startups")
        .select("index")
        .order("index", { ascending: false })
        .limit(1);

      if (maxIndexError) {
        ToastError({ message: "Failed to fetch max index" });
        setAddLoading(false);
        return;
      }

      const newIndex = maxIndexData?.length > 0 ? maxIndexData[0].index + 1 : 1;

      const { error } = await supabase.from(table).insert({
        user_id: userId,
        name: "",
        description: "",
        category: "",
        website: secureValue,
        status: "active",
        verified: false,
        index: newIndex,
        estimated_revenue: 0,
        visibility_on_profile: true,
        show_status: true,
      });

      if (error) throw error;
      else {
        ToastSuccess({ message: "New startup inserted successfully" });
      }
    } else if (table === "links") {
      const { data: maxIndexData, error: maxIndexError } = await supabase
        .from("links")
        .select("index")
        .order("index", { ascending: false })
        .limit(1);

      if (maxIndexError) {
        ToastError({ message: "Failed to fetch max index" });
        setAddLoading(false);
        return;
      }

      const newIndex = maxIndexData?.length > 0 ? maxIndexData[0].index + 1 : 1;

      const { error } = await supabase.from(table).insert({
        user_id: userId,
        title: "",
        link: secureValue,
        index: newIndex,
        visibility_on_profile: true,
      });

      if (error) throw error;
      else {
        ToastSuccess({ message: "New link inserted successfully" });
      }
    } else if (table === "projects") {
    }

    setToggles({
      startupAdd: false,
      linkAdd: false,
      projectAdd: false,
    });
    setValues({
      startupAdd: "",
      linkAdd: "",
      projectAdd: "",
    });
    setAddLoading(false);
  } catch (error) {
    console.error("Error handling add logic:", error);
    setAddLoading(false);
  }
};
