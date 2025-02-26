"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client"; // Import Supabase Client

type Subscription = {
  subscription_status: boolean;
  subscription_type: string;
};

type Profile = {
  id: string;
  full_name: string;
  email: string;
  username: string;
  subscriptions?: Subscription[];
};

interface ProfileContextType {
  subscription:string;
  profileData: Profile | null;
  loading: boolean;
  subscriptionStatus: string;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

function getSubscriptionText(subscriptions: Subscription[] | undefined) {
  if (subscriptions?.[0]?.subscription_type === "LF Elite") {
    return "elite";
  } else if (subscriptions?.[0]?.subscription_type === "LF Core") {
    return "core";
  } else {
    return "basic";
  }
}

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [subscription, setSubscription] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const supabase = createClient();

      // Get User
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      // Get Profile Data
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select(
          "*, subscriptions:subscriptions(subscription_status, subscription_type)"
        )
        .eq("id", user?.id)
        .single();

      if (profileError) console.error("Profile fetch error:", profileError);
      
      setProfileData(profileData);
      setSubscription(getSubscriptionText(profileData?.subscriptions));
      setSubscriptionStatus(profileData?.subscriptions?.[0]?.subscription_status);
      setLoading(false);
    };

    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{subscription, profileData, loading, subscriptionStatus }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook for easy access
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
