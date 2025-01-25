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
      ToastError({ message: "Invalid link." });
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
        .eq("user_id",userId)
        .eq("link", secureValue);

      exists = (data && data.length > 0) || false;
    } else if (table === "projects") {
      const { data } = await supabase
        .from("projects")
        .select("github_link")
        .eq("user_id",userId)
        .eq("github_link", secureValue);

      exists = (data && data.length > 0) || false;
    }

    if (exists) {
      ToastError({ message: "Link already exists in the database." });
      setAddLoading(false);
      return;
    }

    if (table === "startups") {
      const { data: maxIndexData, error: maxIndexError } = await supabase
        .from("startups")
        .select("index")
        .eq("user_id", userId)
        .order("index", { ascending: false })
        .limit(1);

      if (maxIndexError) {
        ToastError({ message: "Failed to fetch max index." });
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
        show_toggle: "description",
      });

      if (error) throw error;
      else {
        ToastSuccess({ message: "New startup added successfully." });
      }
    } else if (table === "links") {
      const { data: maxIndexData, error: maxIndexError } = await supabase
        .from("links")
        .select("index")
        .eq("user_id", userId)
        .order("index", { ascending: false })
        .limit(1);

      if (maxIndexError) {
        ToastError({ message: "Failed to fetch max index." });
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
        ToastSuccess({ message: "New link added successfully." });
      }
    } else if (table === "projects") {
      const { data: maxIndexData, error: maxIndexError } = await supabase
        .from("projects")
        .select("index")
        .eq("user_id", userId)
        .order("index", { ascending: false })
        .limit(1);

      if (maxIndexError) {
        ToastError({ message: "Failed to fetch max index." });
        setAddLoading(false);
        return;
      }

      const newIndex = maxIndexData?.length > 0 ? maxIndexData[0].index + 1 : 1;

      // Extract owner and repo from the GitHub link
      const match = secureValue.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (!match) {
        ToastError({ message: "Invalid GitHub repository format." });
        setAddLoading(false);
        return;
      }

      const owner = match[1];
      const repo = match[2];

      // Check if the repository exists and is public using GitHub API
      try {
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}`
        );
        if (!response.ok) {
          if (response.status === 404) {
            ToastError({
              message: "GitHub repository not found or is private.",
            });
            setAddLoading(false);
            return;
          }
        }
      } catch (error: any) {
        ToastError({
          message: error.message || "Failed to verify GitHub repository.",
        });
        setAddLoading(false);
        return;
      }

      const { error } = await supabase.from(table).insert({
        user_id: userId,
        name: "",
        description: "",
        github_link: secureValue,
        website_link: "",
        category: "",
        index: newIndex,
        visibility_on_profile: true,
      });

      if (error) throw error;
      else {
        ToastSuccess({ message: "New project added successfully." });
      }
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
