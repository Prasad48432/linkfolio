import { ToastError } from "@/components/toast";
import type { SupabaseClient } from "@supabase/supabase-js";

export const fetchProfile = async ({
  supabase,
  setTheme,
  setProfileData,
}: {
  supabase: SupabaseClient<any, "public", any>;
  setTheme: any;
  setProfileData: any;
}) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from("profiles")
        .select(
          "full_name, username, bio, country, email, id, avatar_url, profile_link, profile_link_text, user_skills, resume_url, resume_url_visibility, socials, theme, newsletter_config"
        )
        .eq("id", user.id)
        .single();

      if (error) {
        ToastError({ message: "Error fetching profile." });
      } else {
        setTheme(data.theme);
        setProfileData(data);
      }
    }
  } catch (error) {
    ToastError({ message: "Error retrieving profile data." });
  }
};

export const fetchThemes = async ({
  supabase,
  setPalettes,
}: {
  supabase: SupabaseClient<any, "public", any>;
  setPalettes: any;
}) => {
  try {
    const { data, error } = await supabase
      .from("themes")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      ToastError({ message: "Error fetching themes." });
    }

    setPalettes(data);
  } catch (error) {
    ToastError({ message: "Error retrieving profile data:" });
  }
};
