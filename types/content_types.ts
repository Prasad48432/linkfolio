export interface Startup {
  id: string;
  user_id: string;
  name: string;
  description: string;
  icon_url: string;
  category: string;
  website: string;
  title: string;
}

export interface Link {
    id: any;
    user_id: any;
    title: any;
    icon_url: any;
    link: any;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  description: string;
  github_link: string;
  website_link: string;
  category: string;
  status: string;
}
