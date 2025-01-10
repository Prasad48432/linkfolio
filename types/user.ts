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
}
