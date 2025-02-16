"use client";
import { Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { TrendingUp, Plus } from "lucide-react";
import { PiHandsClapping } from "react-icons/pi";
import type { Database } from "@/types/supabasetypes";
import removeMarkdown from "remove-markdown";
import BlogNavbar from "./components/blognavbar";

const Blogs = () => {
  type blog = Database["public"]["Tables"]["blogs"]["Row"];
  interface blogcard extends blog {
    profiles: {
      username: string;
      full_name: string;
      avatar_url: string;
    };
  }
  type profile = {
    full_name: string | null;
    username: string;
    avatar_url: string | null;
    bio: string | null;
  };
  
  const [blogs, setBlogs] = useState<blogcard[]>(() => []);
  const [trendingProfiles, setTrendingProfiles] = useState<profile[]>(() => []);
  const supabase = createClient();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const fetchBlogs = async () => {
          const { data, error } = await supabase
            .from("blogs")
            .select(`*, profiles (avatar_url, full_name, username)`)
            .eq("published", true);
          if (error) throw error;
          setBlogs(data);
        };

        const fetchTrendingProfiles = async () => {
          const { data, error } = await supabase
            .from("profiles")
            .select("full_name, username, avatar_url, bio")
            .limit(3);
          if (error) throw error;
          setTrendingProfiles(data);
        };

        await Promise.all([
          fetchBlogs(),
          fetchTrendingProfiles(),
        ]);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-primary-bg">
      <BlogNavbar/>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-primary-bg">
        <div className="flex flex-col lg:flex-row lg:space-x-12">
          {/* Main Articles */}
          <div className="flex-1">
            {/* <div className="bg-primary-bg">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
                <h1 className="text-6xl mb-6 bricolage font-bold flex gap-3">
                  Stay <span className="text-accent-text">Curious.</span>
                </h1>
                <p className="text-xl mb-8 max-w-xl">
                  Discover stories, thinking, and expertise from writers on any
                  topic.
                </p>
                <button className="bg-secondary-bg border border-secondary-border hover:border-secondary-strongerborder hover:bg-secondary-selection transition-all duration-200 ease-out text-primary-text rounded-full px-4 py-2 text-lg font-light">
                  Start reading
                </button>
              </div>
            </div> */}
            <div className="flex items-center space-x-2 mb-8">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">Trending on Linkfolio</span>
            </div>

            {loading ? (
              <div className="space-y-8">
                {[0.9, 0.8, 0.7, 0.6].map((value, index) => (
                  <div
                    key={index}
                    style={{
                      opacity: value,
                    }}
                    className="w-full h-64 lg:h-32 flex flex-col lg:flex-row lg:space-x-6"
                  >
                    <div className="w-full lg:w-56 h-36 lg:h-full bg-secondary-bg rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/10 to-secondary-bg animate-shimmer" />
                    </div>
                    <div className="w-full lg:w-[calc(100%-224px)] h-28 lg:h-full">
                      <div className="w-[50%] lg:w-[40%] h-[28px] bg-secondary-bg rounded-lg relative overflow-hidden mt-2 mb-1 lg:mt-0 lg:mb-2">
                        <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/10 to-secondary-bg animate-shimmer" />
                      </div>
                      <div className="w-[90%] h-[40px] lg:h-[48px] bg-secondary-bg rounded-lg relative overflow-hidden mb-3">
                        <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/10 to-secondary-bg animate-shimmer" />
                      </div>
                      <div className="w-[60%] h-[20px] bg-secondary-bg rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/10 to-secondary-bg animate-shimmer" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-8">
                {blogs.map((blog, index) => (
                  <a
                    key={index}
                    className="flex space-x-6 cursor-pointer"
                    href={`/blog/${blog.id}`}
                  >
                    <article
                      key={index}
                      className="flex flex-col lg:flex-row lg:space-x-6 cursor-pointer"
                    >
                      <Image
                        src={blog.thumbnail_url || ""}
                        alt={blog.title}
                        width={600}
                        height={300}
                        className="w-full lg:w-56 h-36 lg:h-32 object-cover rounded"
                      />
                      <div className="flex-1 mt-2 lg:-mt-1">
                        <h2 className="text-lg lg:text-xl font-bold mb-1 lg:mb-2 text-primary-text">
                          {blog.title}
                        </h2>
                        <p className="text-sm lg:text-base text-primary-text/70 mb-3 line-clamp-2 font-light">
                          {blog.content?.replace(/<\/?[^>]+(>|$)/g, "").trim()}
                        </p>
                        <div className="flex items-center space-x-2 lg:space-x-4 text-gray-500">
                          <div className="flex items-center space-x-2 lg:space-x-4">
                            <button className="text-primary-text/70 hover:text-primary-text flex items-center justify-center gap-1">
                              <PiHandsClapping className="w-4 h-4 lg:w-5 lg:h-5" />{" "}
                              <span className="text-sm">
                                {blog.appreciations
                                  ? Object.keys(blog.appreciations).length
                                  : 0}
                              </span>
                            </button>
                            <button className="text-primary-text/70 hover:text-primary-text flex items-center justify-center gap-1">
                              <Eye className="w-4 h-4 lg:w-5 lg:h-5" />
                              <span className="text-sm">3.6k</span>
                            </button>
                            <span className="text-sm text-primary-text/80 font-extralight">
                              . 6 Days ago
                            </span>
                            <div className="flex gap-1 items-center justify-center text-primary-text/70 text-sm font-light">
                              {/* <img
                              className="h-7 w-7 rounded-full object-cover"
                              src={blog.profiles.avatar_url}
                            /> */}
                              by
                              <span className="font-medium text-accent-text hover:underline">
                                {" "}
                                {blog.profiles.full_name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80">
            <div className="relative lg:sticky top-10 lg:top-20 flex flex-col items-start justify-center">
              <h3 className="font-semibold mb-4 text-lg">
                Discover more topics
              </h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  "Programming",
                  "Data Science",
                  "Technology",
                  "Self Improvement",
                  "Writing",
                  "Relationships",
                  "Machine Learning",
                  "Productivity",
                ].map((topic, index) => (
                  <button
                    key={index}
                    className="px-4 py-2 rounded-full text-primary-text border border-secondary-border text-sm bg-secondary-bg"
                  >
                    {topic}
                  </button>
                ))}
              </div>
              <h3 className="font-semibold mb-4 text-lg flex items-center justify-center gap-2">
                Discover trending profiles <TrendingUp className="w-5 h-5" />
              </h3>

              {loading ? (
                <div className="space-y-5 w-full">
                  {[0.9, 0.8, 0.7].map((value, index) => (
                    <div
                      style={{
                        opacity: value,
                      }}
                      key={index}
                      className="w-full h-[48px] bg-secondary-bg rounded-lg relative overflow-hidden mt-2 mb-1 lg:mt-0 lg:mb-2"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/10 to-secondary-bg animate-shimmer" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-5">
                  {trendingProfiles.map((profile, index) => (
                    <a
                      key={index}
                      href={`/${profile.username}`}
                      className="flex items-start justify-center gap-2"
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden relative">
                        <img
                          src={profile.avatar_url || ""}
                          alt="Avatar"
                          className="w-full h-full object-cover cursor-pointer"
                        />
                      </div>
                      <div className="flex flex-col items-start justify-center w-[calc(100%-3rem)]">
                        <p className="font-medium cursor-pointer text-primary-text hover:underline transition-all duration-200 ease-out">
                          {profile.full_name}
                        </p>
                        <p className="font-light text-primary-text text-sm line-clamp-1">
                          {profile.bio &&
                            removeMarkdown(profile.bio)
                              .replace(/\s+/g, " ")
                              .trim()}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
