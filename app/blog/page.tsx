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
import ProfileHoverInfo from "./components/profileinfohover";

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
    country: string | null;
    bio: string | null;
    user_skills: any | null;
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
            .select(
              "full_name, username, avatar_url, country, bio, user_skills"
            )
            .limit(4);
          if (error) throw error;
          setTrendingProfiles(data);
        };

        await Promise.all([fetchBlogs(), fetchTrendingProfiles()]);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-lightprimary-bg dark:bg-primary-bg">
      <BlogNavbar />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-lightprimary-bg dark:bg-primary-bg">
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
            <div className="flex items-center space-x-2 mb-8 text-lightprimary-text dark:text-primary-text">
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
                    <div className="w-full lg:w-56 h-36 lg:h-full bg-lightsecondary-loader dark:bg-secondary-bg rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-lightsecondary-loader via-gray-300 to-lightsecondary-loader dark:from-secondary-bg dark:via-gray-400/10 dark:to-secondary-bg animate-shimmer" />
                    </div>
                    <div className="w-full lg:w-[calc(100%-224px)] h-28 lg:h-full">
                      <div className="w-[50%] lg:w-[40%] h-[28px] bg-lightsecondary-loader dark:bg-secondary-bg rounded-lg relative overflow-hidden mt-2 mb-1 lg:mt-0 lg:mb-2">
                        <div className="absolute inset-0 bg-gradient-to-r from-lightsecondary-loader via-gray-300 to-lightsecondary-loader dark:from-secondary-bg dark:via-gray-400/10 dark:to-secondary-bg animate-shimmer" />
                      </div>
                      <div className="w-[90%] h-[40px] lg:h-[48px] bg-lightsecondary-loader dark:bg-secondary-bg rounded-lg relative overflow-hidden mb-3">
                        <div className="absolute inset-0 bg-gradient-to-r from-lightsecondary-loader via-gray-300 to-lightsecondary-loader dark:from-secondary-bg dark:via-gray-400/10 dark:to-secondary-bg animate-shimmer" />
                      </div>
                      <div className="w-[60%] h-[20px] bg-lightsecondary-loader dark:bg-secondary-bg rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-lightsecondary-loader via-gray-300 to-lightsecondary-loader dark:from-secondary-bg dark:via-gray-400/10 dark:to-secondary-bg animate-shimmer" />
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
                        <h2 className="text-lg lg:text-xl font-bold mb-1 lg:mb-2 text-lightprimary-text dark:text-primary-text">
                          {blog.title}
                        </h2>
                        <p className="text-sm lg:text-base text-lightprimary-text/70 dark:text-primary-text/70 mb-3 line-clamp-2 font-light">
                          {blog.content?.replace(/<\/?[^>]+(>|$)/g, "").trim()}
                        </p>
                        <div className="flex items-center text-gray-500">
                          <div className="flex items-center space-x-1.5 lg:space-x-2">
                            <button className="text-lightprimary-text/70 dark:text-primary-text/70 fill-lightprimary-text/70 dark:fill-primary-text/70 hover:fill-lightprimary-text hover:text-lightprimary-text dark:hover:fill-primary-text dark:hover:text-primary-text flex items-center justify-center gap-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                aria-label="clap"
                                className="w-5 lg:w-6 h-5 lg:h-6"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M11.37.828 12 3.282l.63-2.454zM13.916 3.953l1.523-2.112-1.184-.39zM8.589 1.84l1.522 2.112-.337-2.501zM18.523 18.92c-.86.86-1.75 1.246-2.62 1.33a6 6 0 0 0 .407-.372c2.388-2.389 2.86-4.951 1.399-7.623l-.912-1.603-.79-1.672c-.26-.56-.194-.98.203-1.288a.7.7 0 0 1 .546-.132c.283.046.546.231.728.5l2.363 4.157c.976 1.624 1.141 4.237-1.324 6.702m-10.999-.438L3.37 14.328a.828.828 0 0 1 .585-1.408.83.83 0 0 1 .585.242l2.158 2.157a.365.365 0 0 0 .516-.516l-2.157-2.158-1.449-1.449a.826.826 0 0 1 1.167-1.17l3.438 3.44a.363.363 0 0 0 .516 0 .364.364 0 0 0 0-.516L5.293 9.513l-.97-.97a.826.826 0 0 1 0-1.166.84.84 0 0 1 1.167 0l.97.968 3.437 3.436a.36.36 0 0 0 .517 0 .366.366 0 0 0 0-.516L6.977 7.83a.82.82 0 0 1-.241-.584.82.82 0 0 1 .824-.826c.219 0 .43.087.584.242l5.787 5.787a.366.366 0 0 0 .587-.415l-1.117-2.363c-.26-.56-.194-.98.204-1.289a.7.7 0 0 1 .546-.132c.283.046.545.232.727.501l2.193 3.86c1.302 2.38.883 4.59-1.277 6.75-1.156 1.156-2.602 1.627-4.19 1.367-1.418-.236-2.866-1.033-4.079-2.246M10.75 5.971l2.12 2.12c-.41.502-.465 1.17-.128 1.89l.22.465-3.523-3.523a.8.8 0 0 1-.097-.368c0-.22.086-.428.241-.584a.847.847 0 0 1 1.167 0m7.355 1.705c-.31-.461-.746-.758-1.23-.837a1.44 1.44 0 0 0-1.11.275c-.312.24-.505.543-.59.881a1.74 1.74 0 0 0-.906-.465 1.47 1.47 0 0 0-.82.106l-2.182-2.182a1.56 1.56 0 0 0-2.2 0 1.54 1.54 0 0 0-.396.701 1.56 1.56 0 0 0-2.21-.01 1.55 1.55 0 0 0-.416.753c-.624-.624-1.649-.624-2.237-.037a1.557 1.557 0 0 0 0 2.2c-.239.1-.501.238-.715.453a1.56 1.56 0 0 0 0 2.2l.516.515a1.556 1.556 0 0 0-.753 2.615L7.01 19c1.32 1.319 2.909 2.189 4.475 2.449q.482.08.971.08c.85 0 1.653-.198 2.393-.579.231.033.46.054.686.054 1.266 0 2.457-.52 3.505-1.567 2.763-2.763 2.552-5.734 1.439-7.586z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                              <span className="text-sm font-light">
                                {blog.appreciations
                                  ? Object.keys(blog.appreciations).length
                                  : 0}
                              </span>
                            </button>
                            <span className="font-extrabold">&middot;</span>{" "}
                            <button className="text-lightprimary-text/70 hover:text-lightprimary-text dark:text-primary-text/70 dark:hover:text-primary-text flex items-center justify-center gap-1">
                              <Eye strokeWidth={1} className="w-5 lg:w-6 h-5 lg:h-6" />
                              <span className="text-sm font-light">3.6k</span>
                            </button>
                            <span className="font-extrabold">&middot;</span>{" "}
                            <span className="text-sm text-lightprimary-text/80 dark:text-primary-text/80 font-extralight">
                              6 Days ago
                            </span>
                            <span className="font-extrabold">&middot;</span>{" "}
                            <div className="flex gap-1 items-center justify-center text-lightprimary-text/70 dark:text-primary-text/70 text-sm font-light">
                              {/* <img
                              className="h-7 w-7 rounded-full object-cover"
                              src={blog.profiles.avatar_url}
                            /> */}
                              by
                              <span className="font-medium text-lightaccent-text dark:text-accent-text hover:underline max-w-24 lg:max-w-56 truncate text-ellipsis">
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
              <h3 className="font-semibold mb-4 text-lg text-lightprimary-text dark:text-primary-text">
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
                    className="px-4 py-2 rounded-full text-lightprimary-text dark:text-primary-text border border-lightsecondary-border dark:border-secondary-border text-sm bg-lightsecondary-bg dark:bg-secondary-bg"
                  >
                    {topic}
                  </button>
                ))}
              </div>
              <h3 className="font-semibold mb-4 text-lg flex items-center justify-center gap-2 text-lightprimary-text dark:text-primary-text">
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
                      className="w-full h-[48px] bg-lightsecondary-loader dark:bg-secondary-bg rounded-lg relative overflow-hidden mt-2 mb-1 lg:mt-0 lg:mb-2"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-lightsecondary-loader via-gray-300 to-lightsecondary-loader dark:from-secondary-bg dark:via-gray-400/10 dark:to-secondary-bg animate-shimmer" />
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
                        <span className="group font-medium text-lightprimary-text dark:text-primary-text transition duration-200">
                          <ProfileHoverInfo profile={profile} />
                        </span>
                        <p className="font-light text-lightprimary-text dark:text-primary-text text-sm line-clamp-1">
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
