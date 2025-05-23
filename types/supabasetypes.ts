export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blogs: {
        Row: {
          appreciations: Json | null
          author_id: string | null
          content: string | null
          created_at: string | null
          id: string
          published: boolean | null
          seotags: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          views: number | null
        }
        Insert: {
          appreciations?: Json | null
          author_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          published?: boolean | null
          seotags?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          appreciations?: Json | null
          author_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          published?: boolean | null
          seotags?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blogs_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          author_id: string | null
          blog_id: string | null
          comment: string
          created_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          author_id?: string | null
          blog_id?: string | null
          comment: string
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          author_id?: string | null
          blog_id?: string | null
          comment?: string
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_blog_id_fkey"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blogs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      links: {
        Row: {
          clicks: number | null
          created_at: string | null
          id: string
          index: number | null
          link: string
          title: string
          user_id: string | null
          visibility_on_profile: boolean | null
        }
        Insert: {
          clicks?: number | null
          created_at?: string | null
          id?: string
          index?: number | null
          link: string
          title: string
          user_id?: string | null
          visibility_on_profile?: boolean | null
        }
        Update: {
          clicks?: number | null
          created_at?: string | null
          id?: string
          index?: number | null
          link?: string
          title?: string
          user_id?: string | null
          visibility_on_profile?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "links_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          status: boolean | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          email: string
          id?: string
          status?: boolean | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          email?: string
          id?: string
          status?: boolean | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "newsletter_subscribers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pageviews: {
        Row: {
          created_at: string | null
          device_id: string
          id: string
          monthly_views: Json | null
          user_id: string | null
          username: string
          views: number | null
        }
        Insert: {
          created_at?: string | null
          device_id: string
          id?: string
          monthly_views?: Json | null
          user_id?: string | null
          username: string
          views?: number | null
        }
        Update: {
          created_at?: string | null
          device_id?: string
          id?: string
          monthly_views?: Json | null
          user_id?: string | null
          username?: string
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pageviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          country: string | null
          email: string | null
          favicon: string | null
          full_name: string | null
          id: string
          newsletter_config: Json | null
          profile_link: string | null
          profile_link_text: string | null
          resume_url: string | null
          resume_url_visibility: boolean | null
          socials: Json | null
          theme: Json | null
          user_skills: Json | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          email?: string | null
          favicon?: string | null
          full_name?: string | null
          id: string
          newsletter_config?: Json | null
          profile_link?: string | null
          profile_link_text?: string | null
          resume_url?: string | null
          resume_url_visibility?: boolean | null
          socials?: Json | null
          theme?: Json | null
          user_skills?: Json | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          email?: string | null
          favicon?: string | null
          full_name?: string | null
          id?: string
          newsletter_config?: Json | null
          profile_link?: string | null
          profile_link_text?: string | null
          resume_url?: string | null
          resume_url_visibility?: boolean | null
          socials?: Json | null
          theme?: Json | null
          user_skills?: Json | null
          username?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string | null
          clicks: number | null
          created_at: string | null
          description: string | null
          github_link: string | null
          id: string
          index: number | null
          name: string
          user_id: string | null
          visibility_on_profile: boolean | null
          website_link: string | null
        }
        Insert: {
          category?: string | null
          clicks?: number | null
          created_at?: string | null
          description?: string | null
          github_link?: string | null
          id?: string
          index?: number | null
          name: string
          user_id?: string | null
          visibility_on_profile?: boolean | null
          website_link?: string | null
        }
        Update: {
          category?: string | null
          clicks?: number | null
          created_at?: string | null
          description?: string | null
          github_link?: string | null
          id?: string
          index?: number | null
          name?: string
          user_id?: string | null
          visibility_on_profile?: boolean | null
          website_link?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      startups: {
        Row: {
          api_info: Json | null
          category: string | null
          clicks: number | null
          created_at: string | null
          description: string | null
          estimated_revenue: number | null
          id: string
          index: number | null
          name: string
          show_status: boolean | null
          show_toggle: string | null
          status: string | null
          user_id: string | null
          verified: boolean | null
          visibility_on_profile: boolean | null
          website: string | null
        }
        Insert: {
          api_info?: Json | null
          category?: string | null
          clicks?: number | null
          created_at?: string | null
          description?: string | null
          estimated_revenue?: number | null
          id?: string
          index?: number | null
          name: string
          show_status?: boolean | null
          show_toggle?: string | null
          status?: string | null
          user_id?: string | null
          verified?: boolean | null
          visibility_on_profile?: boolean | null
          website?: string | null
        }
        Update: {
          api_info?: Json | null
          category?: string | null
          clicks?: number | null
          created_at?: string | null
          description?: string | null
          estimated_revenue?: number | null
          id?: string
          index?: number | null
          name?: string
          show_status?: boolean | null
          show_toggle?: string | null
          status?: string | null
          user_id?: string | null
          verified?: boolean | null
          visibility_on_profile?: boolean | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "startups_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string
          currency: string
          id: string
          subscription_id: string
          subscription_product_id: string
          subscription_status: boolean
          subscription_type: string
          subscription_variant: string
          unit_price: number
          user_id: string | null
        }
        Insert: {
          created_at: string
          currency: string
          id?: string
          subscription_id: string
          subscription_product_id: string
          subscription_status: boolean
          subscription_type: string
          subscription_variant: string
          unit_price: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          currency?: string
          id?: string
          subscription_id?: string
          subscription_product_id?: string
          subscription_status?: boolean
          subscription_type?: string
          subscription_variant?: string
          unit_price?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      themes: {
        Row: {
          created_at: string | null
          id: number
          theme_data: Json
          theme_type: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          theme_data: Json
          theme_type: string
        }
        Update: {
          created_at?: string | null
          id?: number
          theme_data?: Json
          theme_type?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          created_at: string
          currency: string
          id: string
          subscription_id: string
          subscription_product_id: string
          subscription_variant: string
          transaction_id: string
          transaction_status: string
          unit_price: number
          user_id: string | null
        }
        Insert: {
          created_at: string
          currency: string
          id?: string
          subscription_id: string
          subscription_product_id: string
          subscription_variant: string
          transaction_id: string
          transaction_status: string
          unit_price: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          currency?: string
          id?: string
          subscription_id?: string
          subscription_product_id?: string
          subscription_variant?: string
          transaction_id?: string
          transaction_status?: string
          unit_price?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
