export interface HomeProfileData {
  full_name: string;
  username: string;
  bio: string;
  country: string;
  email: string;
  id: string;
  avatar_url: string;
  profile_link: string;
  profile_link_text: string;
  user_skills: [] | any; // assuming user_skills is an array of strings (you can adjust this as needed)
  resume_url: string;
  resume_url_visibility: boolean;
  theme: {
    primary_bg: string;
    secondary_bg: string;
    primary_text: string;
    accent_text: string;
    border: string;
    strongerborder: string;
  }
}



export interface ProfileData {
  full_name: string;
  username: string;
  bio: string;
  country: string;
  email: string;
  id: string;
  avatar_url: string;
  profile_link: string;
  profile_link_text: string;
  user_skills: [] | any; // assuming user_skills is an array of strings (you can adjust this as needed)
  resume_url: string;
  resume_url_visibility: boolean;
  socials: {
    instagram: string;
    facebook: string;
    x: string;
    github: string;
    linkedin: string;
    youtube: string;
  }
  theme: {
    primary_bg: string;
    secondary_bg: string;
    primary_text: string;
    accent_text: string;
    border: string;
    strongerborder: string;
  }
  newsletter_config:{
    newsletter_title: string;
    mailchimp_api_key: string;
    mailchimp_audience_id: string;
    newsletter_call_to_action: string;
  }
}

export interface ToggleSwitchProps {
  resumeUrlVisibility: boolean;
  handleToggleUpdate: (inputBoolean: boolean, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => Promise<void>;
}
