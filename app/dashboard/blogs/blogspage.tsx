"use client";
import React from "react";
import RichTextEditor from "@/components/richtexteditor/index";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BookText, ChevronRight, Plus, Save, Upload } from "lucide-react";
import { PiHandsClappingLight } from "react-icons/pi";
import { IoEyeOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { CgTrashEmpty } from "react-icons/cg";
import { createClient } from "@/utils/supabase/client";
import type { Database } from "@/types/supabasetypes";
import { useEffect, useState } from "react";
import { ToastError, ToastSuccess } from "@/components/toast";
import { useSearchParams } from "next/navigation";

function extractTextFromHTML(html: any) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent?.trim() || "";
}

const formSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" })
    .max(100, { message: "Title must be less than 100 characters" }),
  seotags: z
    .string()
    .refine((value) => value.split(",").every((tag) => tag.trim().length > 0), {
      message: "Each tag must be non-empty and separated by commas",
    }),
  thumbnail_url: z.string().url({ message: "Thumbnail must be a valid URL" }),
  content: z.string().refine(
    (value) => {
      return extractTextFromHTML(value).trim().length >= 5;
    },
    {
      message: "The text must be at least 5 characters long after trimming",
    }
  ),
});

export default function Blogs() {
  const supabase = createClient();
  const searchparams = useSearchParams();
  type blogs = Database["public"]["Tables"]["blogs"]["Row"];
  const [blogs, setBlogs] = useState<blogs[]>(() => []);
  const [fetchLoading, setFetchLoading] = useState(true);
  const editable_blogid = searchparams.get("edit");
  const [selectedBlog, setSelectedBlog] = useState<blogs | null>(null);

  const fetchBlogs = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("author_id", user.id)
          .order("updated_at", { ascending: false });

        if (error) {
          console.error("Error fetching blogs:", error.message);
        } else {
          setBlogs(data);
          if (editable_blogid) {
            const blogToEdit = data.find((blog) => blog.id === editable_blogid);
            setSelectedBlog(blogToEdit || null);
          }
        }
      }
    } catch (error) {
      console.error("Error retrieving blogs data:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  const updateBlog = async ({
    docid,
    blog,
  }: {
    docid: string;
    blog: {
      title: string;
      seotags: string;
      thumbnail_url: string;
      content: string;
    };
  }) => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .update({
          ...blog,
          updated_at: new Date().toISOString(),
        })
        .eq("id", docid);
    } catch (error) {
      console.error("Error updating blog data:", error);
    } finally {
    }
  };

  const addBlog = async ({
    blog,
  }: {
    blog: {
      title: string;
      seotags: string;
      thumbnail_url: string;
      content: string;
    };
  }) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase.from("blogs").insert({
        ...blog,
        user_id: user?.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        published: true,
      });

      if (error) throw error;

      ToastSuccess({ message: "Blog published successfully." });
      form.reset();
    } catch (error) {
      console.error("Failed to publish blog:", error);
      ToastError({ message: "Failed to publish blog" });
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (editable_blogid && blogs.length > 0) {
      const blogToEdit = blogs.find((blog) => blog.id === editable_blogid);
      if (blogToEdit) {
        handleBlogClick(blogToEdit);
      }
    }
  }, [editable_blogid, blogs]);

  useEffect(() => {
    const initializeListeners = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const userId = user?.id;

        const blogsSubscription = supabase
          .channel("blogs-changes")
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "blogs",
              filter: `author_id=eq.${userId}`,
            },
            () => {
              fetchBlogs();
            }
          )
          .subscribe();

        return () => {
          supabase.removeChannel(blogsSubscription);
        };
      } catch (error) {
        console.log(error);
      }
    };

    initializeListeners();
  }, []);

  const form = useForm({
    mode: "onTouched",
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      seotags: "",
      thumbnail_url: "",
      content: "",
    },
  });

  const { setValue } = form;

  const handleBlogClick = (blog: blogs) => {
    setValue("title", blog.title || "");
    setValue("seotags", blog.seotags || "");
    setValue("thumbnail_url", blog.thumbnail_url || "");
    setValue("content", blog.content || "");
  };

  return (
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-4">
        {fetchLoading ? (
          <div className="lg:w-1/3 w-full h-auto py-5 flex flex-col items-center justify-start gap-2">
            <div className="w-full h-8 lg:h-10 bg-secondary-bg rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/10 to-secondary-bg animate-shimmer" />
            </div>
            <div className="w-full h-32 bg-secondary-bg rounded-lg relative overflow-hidden opacity-75">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/10 to-secondary-bg animate-shimmer" />
            </div>
            <div className="w-full h-32 bg-secondary-bg rounded-lg relative overflow-hidden opacity-60">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/10 to-secondary-bg animate-shimmer" />
            </div>
            <div className="w-full h-32 bg-secondary-bg rounded-lg relative overflow-hidden opacity-45">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/10 to-secondary-bg animate-shimmer" />
            </div>
          </div>
        ) : (
          <div className="lg:w-1/3 w-full h-auto py-5 flex flex-col items-center justify-center lg:justify-start gap-2">
            <div
              onClick={() => {
                setSelectedBlog(null);
                form.reset();
              }}
              data-active={selectedBlog === null}
              className="bg-secondary-bg cursor-pointer w-full h-8 lg:h-10 data-[active=true]:text-primary-text data-[active=true]:bg-secondary-bg data-[active=false]:text-primary-text/70 data-[active=false]:hover:text-primary-text font-medium py-2 px-4 rounded-md border data-[active=true]:border-primary-text/60 data-[active=true]:hover:border-primary-text/60 data-[active=false]:border-secondary-border data-[active=false]:hover:bg-secondary-selection/80 data-[active=false]:hover:border-secondary-strongerborder transition-all duration-200 ease-out  text-xs sm:text-sm flex items-center justify-center"
            >
              <Plus className="mr-1" size={15} /> Add new
            </div>
            <>
              {blogs?.length === 0 ? (
                <div className="flex flex-col items-center justify-center w-full h-[60vh] gap-1">
                  <BookText
                    strokeWidth={1}
                    size={75}
                    className="text-primary-text/60"
                  />
                  <p className="text-lg text-primary-text/60">
                    No Blogs found.
                  </p>
                  <p className="text-base text-primary-text/60">
                    Start adding your first Blog.
                  </p>
                </div>
              ) : (
                blogs.map((blog, index) => (
                  <div
                    key={index}
                    data-active={selectedBlog?.id === blog.id}
                    className="p-3 group/blogcard gap-2 w-full h-32 flex items-center justify-center bg-secondary-bg data-[active=true]:hover:bg-secondary-bg data-[active=false]:hover:bg-secondary-selection/80 border border-secondary-border data-[active=true]:border-primary-text/60 hover:border-secondary-strongerborder rounded-lg transition-all ease-out duration-200"
                  >
                    <div className="flex flex-col items-center justify-center w-[95%] h-full gap-2">
                      <div className="flex items-center justify-center gap-2 w-full h-2/3">
                        <img
                          src={blog.thumbnail_url || ""}
                          data-active={selectedBlog?.id === blog.id}
                          className="w-2/6 h-full rounded-md object-cover data-[active=true]:opacity-100 data-[active=false]:opacity-80 group-hover/blogcard:opacity-100"
                        />
                        <div className="w-4/6 h-full flex flex-col items-start justify-center">
                          <p className="text-primary-text font-normal text-sm line-clamp-1">
                            {blog.title}
                          </p>
                          <p className="text-primary-text/80 font-normal text-xs line-clamp-3">
                            {blog.content}
                          </p>
                        </div>
                      </div>
                      <div className="h-1/3 w-full flex items-center justify-start gap-2 divide-x divide-secondary-strongerborder">
                        <div
                          title="Appreciations"
                          className="flex items-center justify-center text-xs lg:text-sm font-normal cursor-pointer text-primary-text/80"
                        >
                          <PiHandsClappingLight
                            strokeWidth={1}
                            className="mr-1"
                          />
                          2.6k
                        </div>
                        <div
                          title="Views"
                          className="flex items-center justify-center text-xs lg:text-sm font-normal pl-1 lg:pl-2 cursor-pointer text-primary-text/80"
                        >
                          <IoEyeOutline strokeWidth={1} className="mr-1" />
                          1.4k
                        </div>
                        <a
                          target="_blank"
                          href={`/blog/${blog.id}`}
                          className="flex items-center justify-center text-xs lg:text-sm font-normal pl-1 lg:pl-2 cursor-pointer text-primary-text/80"
                        >
                          <LiaExternalLinkAltSolid
                            strokeWidth={1}
                            className="mr-1"
                          />
                          Preview
                        </a>
                        <div
                          onClick={() => {
                            setSelectedBlog(blog);
                            handleBlogClick(blog);
                          }}
                          className="flex items-center justify-center text-xs lg:text-sm font-normal pl-1 lg:pl-2 cursor-pointer text-primary-text/80"
                        >
                          <CiEdit strokeWidth={1} className="mr-1" />
                          Edit
                        </div>
                        <div className="flex items-center justify-center text-xs lg:text-sm font-normal text-red-500/80 pl-1 lg:pl-2 cursor-pointer">
                          <CgTrashEmpty strokeWidth={1} className="mr-1" />
                          Delete
                        </div>
                      </div>
                    </div>
                    <div className="w-[5%] cursor-pointer h-full flex items-center justify-center group-hover/blogcard:translate-x-1 transition-all duration-200 ease-out">
                      <ChevronRight />
                    </div>
                  </div>
                ))
              )}
            </>
          </div>
        )}
        <div className="lg:w-2/3 w-full py-5 h-auto">
          <p className="text-primary-text text-lg lg:text-xl font-medium mb-4">
            {selectedBlog ? (
              <>
                Editing{" "}
                <span className="text-accent-text">Blog-{selectedBlog.id}</span>
              </>
            ) : (
              "Add New Blog"
            )}
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async (data) => {
                try {
                  if (selectedBlog) {
                    await updateBlog({
                      docid: selectedBlog.id,
                      blog: {
                        title: data.title,
                        seotags: data.seotags,
                        thumbnail_url: data.thumbnail_url,
                        content: data.content,
                      },
                    });
                    ToastSuccess({ message: "Blog updated successfully." });
                  } else {
                    await addBlog({
                      blog: {
                        title: data.title,
                        seotags: data.seotags,
                        thumbnail_url: data.thumbnail_url,
                        content: data.content,
                      },
                    });
                  }
                } catch (error) {
                  console.error("Failed to submit form:", error);
                }
              })}
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary-text">
                      Blog Title
                    </FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="Enter blog title"
                        className="w-full p-2 border rounded-md bg-primary-bg text-primary-text mb-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="seotags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary-text">
                      SEO Tags
                    </FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="Enter SEO tags"
                        className="w-full p-2 border rounded-md bg-primary-bg text-primary-text mb-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="thumbnail_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary-text">
                      Thumbnail URL
                    </FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="Enter Thumbnail image url"
                        className="w-full p-2 border rounded-md bg-primary-bg text-primary-text mb-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary-text">
                      Blog Content
                    </FormLabel>
                    <FormControl>
                      <RichTextEditor
                        content={field.value}
                        onChange={(value: any) => field.onChange(value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {selectedBlog ? (
                <Button
                  type="submit"
                  className="mt-4 bg-secondary-bg w-full h-10 text-primary-text font-medium py-2 px-4 rounded-md border hover:bg-secondary-selection hover:border-secondary-strongerborder transition-all duration-200"
                >
                  <Save className="mr-1" />
                  Save Changes
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="mt-4 bg-accent-bg w-full h-10 text-white font-medium py-2 px-4 rounded-md hover:bg-accent-hover transition-all duration-200"
                >
                  <Upload className="mr-1" />
                  Publish
                </Button>
              )}
            </form>
          </Form>
        </div>
      </div>
  );
}
