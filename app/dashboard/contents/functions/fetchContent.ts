import { ToastError } from "@/components/toast";
import { SupabaseClient } from "@supabase/supabase-js";

export const fetchLinks = async ({
  userId,
  supabase,
  setLinks,
}: {
  userId: any;
  supabase: SupabaseClient<any, "public", any>;
  setLinks: React.Dispatch<React.SetStateAction<any[] | null>>;
}) => {
  try {
    if (!userId) return;

    const { data: linksf } = await supabase
      .from("links")
      .select("*")
      .eq("user_id", userId)
      .order("index", { ascending: true });

    setLinks(linksf);
  } catch (err) {
    ToastError({ message: "An unexpected error occurred." });
  }
};

export const fetchStartups = async ({
  userId,
  supabase,
  setStartups,
}: {
  userId: any;
  supabase: SupabaseClient<any, "public", any>;
  setStartups: React.Dispatch<React.SetStateAction<any[] | null>>;
}) => {
  try {
    if (!userId) return;

    const { data: startupsf } = await supabase
      .from("startups")
      .select("*")
      .eq("user_id", userId)
      .order("index", { ascending: true });

    setStartups(startupsf);
  } catch (err) {
    ToastError({ message: "An unexpected error occurred." });
  }
};

export const fetchProjects = async ({
  userId,
  supabase,
  setProjects,
}: {
  userId: any;
  supabase: SupabaseClient<any, "public", any>;
  setProjects: React.Dispatch<React.SetStateAction<any[] | null>>;
}) => {
  try {
    if (!userId) return;

    const { data: projectsf } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId);
    setProjects(projectsf);
  } catch (err) {
    ToastError({ message: "An unexpected error occurred." });
  }
};
