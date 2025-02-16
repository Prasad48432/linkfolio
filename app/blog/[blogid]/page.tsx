import React from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { FlagIcon } from "lucide-react";
import BlogNavbar from "../components/blognavbar";
import { LuMessageCircleMore, LuShare, LuPencil } from "react-icons/lu";
import CommentBox from "../components/blogcomment";
import Link from "next/link";
import { format, differenceInDays, parseISO } from "date-fns";
import ProfileHoverInfo from "../components/profileinfohover";

interface Params {
  blogid: string;
  utm_source?: string;
  utm_location?: string;
}

const formatDate = (createdAt: string) => {
  const date = parseISO(createdAt);
  const daysAgo = differenceInDays(new Date(), date);

  if (daysAgo <= 10) {
    return `${daysAgo} days ago`;
  } else {
    return format(date, "MMM d, yyyy");
  }
};

export default async function BlogPage({ params }: { params: Params }) {
  const supabase = createClient();
  const { data: user, error: usererror } = await supabase.auth.getUser();
  const { data: blog, error: blogerror } = await supabase
    .from("blogs")
    .select(
      `
      *,
      profiles:author_id (id, full_name, username, avatar_url, country, bio, user_skills),
      comments (
        id, comment, created_at,
        profiles:user_id (id, full_name, username, avatar_url, country, bio, user_skills)
      )
    `
    )
    .eq("id", params.blogid)
    .single();
  const isAuthor = user.user?.id === blog.author_id;

  if (blogerror || !blog) {
    return (
      <div className="h-screen mx-auto grid place-items-center text-center px-8">
        <FlagIcon className="w-20 h-20 mx-auto" />
        <p className="mt-10 !text-3xl !leading-snug md:!text-4xl">
          Error 404 <br /> No Blog found with id {params.blogid}
        </p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-primary-bg">
      <BlogNavbar />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 bg-primary-bg">
        <div className="flex flex-col lg:flex-row lg:space-x-12">
          {/* Main Articles */}
          <div className="flex-1">
            <div className="flex flex-col gap-3 items-start justify-center">
              <h1 className="font-bold text-[25px] leading-[35px] lg:text-[35px] lg:leading-[52px] text-primary-text tracking-[-0.011em]">
                {blog.title}
              </h1>
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-0 justify-start lg:justify-between w-full mb-4">
                <div className="flex items-start justify-center gap-3 pl-1">
                  <img
                    src={blog.profiles.avatar_url}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  <div className="flex flex-col items-start justify-center">
                    <p className="text-primary-text font-normal flex items-center justify-center">
                      <span className="group font-medium text-primary-text/80 transition duration-200">
                        <ProfileHoverInfo profile={blog.profiles} />
                      </span>
                      <span className="text-primary-text/70 font-extrabold mx-2">
                        &middot;
                      </span>
                      <span className="text-primary-text/50">Follow</span>
                    </p>
                    <p className="text-primary-text/70 text-sm font-extralight">
                      10 min read{" "}
                      <span className="font-extrabold mx-1">&middot;</span>{" "}
                      {formatDate(blog.created_at)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 pl-2 lg:pl-0">
                  <div
                    title="Appreciations"
                    className="flex items-center justify-center text-sm lg:text-base font-extralight cursor-pointer text-primary-text/80"
                  >
                    <UnClappedSvg />
                    2.6k
                  </div>
                  <a
                    href="#comments"
                    title="comments"
                    className="flex items-center justify-center text-sm lg:text-base font-extralight cursor-pointer text-primary-text/80"
                  >
                    <LuMessageCircleMore
                      strokeWidth={1}
                      className="mr-1 text-xl"
                    />
                    {blog.comments.length}
                  </a>
                  <div className="flex items-center justify-center text-sm lg:text-base font-extralight cursor-pointer text-primary-text/80">
                    <LuShare strokeWidth={1} className="mr-1 text-xl" />
                    Share
                  </div>
                  {isAuthor && (
                    <Link
                      target="_blank"
                      href={{
                        pathname: "/dashboard/blogs",
                        query: { edit: blog.id },
                      }}
                      className="flex items-center justify-center text-sm lg:text-base font-extralight cursor-pointer text-primary-text/80"
                    >
                      <LuPencil strokeWidth={1} className="mr-1 text-xl" />
                      Edit
                    </Link>
                  )}
                </div>
              </div>
              <img
                className="w-full h-full rounded-lg object-cover"
                src={blog.thumbnail_url}
              />
              <article
                dangerouslySetInnerHTML={{ __html: blog.content }}
                className="blog_content_renderer px-1"
              />
              <div id="comments" className="flex flex-col gap-3 w-full">
                <p className="text-lg font-semibold text-primary-text mb-2">
                  Comments ({blog.comments.length})
                </p>
                {!isAuthor && (
                  <CommentBox blogId={blog.id} authorId={blog.profiles.id} />
                )}
                <div className="flex flex-col items-start justify-center gap-4 w-full px-2">
                  {blog.comments.map((comment: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-start justify-start gap-3 w-full"
                    >
                      <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={comment.profiles.avatar_url}
                      />
                      <div className="flex flex-col items-start justify-center w-[calc(100%-2.5rem)]">
                        <span className="group font-medium text-primary-text/90 transition duration-200">
                          <ProfileHoverInfo profile={comment.profiles} />
                        </span>
                        <p className="font-light text-primary-text/70 text-sm">
                          {comment.comment}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* sidebar */}
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
              <h3 className="font-semibold mb-4 text-lg">Similar blogs</h3>
              <div className="flex flex-col gap-2 mb-8">
                <div className="w-full h-20 flex flex-col">
                  <p className="text-primary-text font-semibold">
                    How I Tricked My Brain to Be Addicted to Coding
                  </p>
                  <p className="text-primary-text font-light">Feb 7</p>
                </div>
                <div className="w-full h-20 flex flex-col">
                  <p className="text-primary-text font-semibold">
                    How I Tricked My Brain to Be Addicted to Coding
                  </p>
                  <p className="text-primary-text font-light">Feb 7</p>
                </div>
                <div className="w-full h-20 flex flex-col">
                  <p className="text-primary-text font-semibold">
                    How I Tricked My Brain to Be Addicted to Coding
                  </p>
                  <p className="text-primary-text font-light">Feb 7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const UnClappedSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      aria-label="clap"
    >
      <path
        fillRule="evenodd"
        d="M11.37.828 12 3.282l.63-2.454zM13.916 3.953l1.523-2.112-1.184-.39zM8.589 1.84l1.522 2.112-.337-2.501zM18.523 18.92c-.86.86-1.75 1.246-2.62 1.33a6 6 0 0 0 .407-.372c2.388-2.389 2.86-4.951 1.399-7.623l-.912-1.603-.79-1.672c-.26-.56-.194-.98.203-1.288a.7.7 0 0 1 .546-.132c.283.046.546.231.728.5l2.363 4.157c.976 1.624 1.141 4.237-1.324 6.702m-10.999-.438L3.37 14.328a.828.828 0 0 1 .585-1.408.83.83 0 0 1 .585.242l2.158 2.157a.365.365 0 0 0 .516-.516l-2.157-2.158-1.449-1.449a.826.826 0 0 1 1.167-1.17l3.438 3.44a.363.363 0 0 0 .516 0 .364.364 0 0 0 0-.516L5.293 9.513l-.97-.97a.826.826 0 0 1 0-1.166.84.84 0 0 1 1.167 0l.97.968 3.437 3.436a.36.36 0 0 0 .517 0 .366.366 0 0 0 0-.516L6.977 7.83a.82.82 0 0 1-.241-.584.82.82 0 0 1 .824-.826c.219 0 .43.087.584.242l5.787 5.787a.366.366 0 0 0 .587-.415l-1.117-2.363c-.26-.56-.194-.98.204-1.289a.7.7 0 0 1 .546-.132c.283.046.545.232.727.501l2.193 3.86c1.302 2.38.883 4.59-1.277 6.75-1.156 1.156-2.602 1.627-4.19 1.367-1.418-.236-2.866-1.033-4.079-2.246M10.75 5.971l2.12 2.12c-.41.502-.465 1.17-.128 1.89l.22.465-3.523-3.523a.8.8 0 0 1-.097-.368c0-.22.086-.428.241-.584a.847.847 0 0 1 1.167 0m7.355 1.705c-.31-.461-.746-.758-1.23-.837a1.44 1.44 0 0 0-1.11.275c-.312.24-.505.543-.59.881a1.74 1.74 0 0 0-.906-.465 1.47 1.47 0 0 0-.82.106l-2.182-2.182a1.56 1.56 0 0 0-2.2 0 1.54 1.54 0 0 0-.396.701 1.56 1.56 0 0 0-2.21-.01 1.55 1.55 0 0 0-.416.753c-.624-.624-1.649-.624-2.237-.037a1.557 1.557 0 0 0 0 2.2c-.239.1-.501.238-.715.453a1.56 1.56 0 0 0 0 2.2l.516.515a1.556 1.556 0 0 0-.753 2.615L7.01 19c1.32 1.319 2.909 2.189 4.475 2.449q.482.08.971.08c.85 0 1.653-.198 2.393-.579.231.033.46.054.686.054 1.266 0 2.457-.52 3.505-1.567 2.763-2.763 2.552-5.734 1.439-7.586z"
        clipRule="evenodd"
        fill="#ededed"
      ></path>
    </svg>
  );
};

const ClappedSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      aria-label="clap"
    >
      <path
        fillRule="evenodd"
        d="M11.37.828 12 3.282l.63-2.454zM15.421 1.84l-1.185-.388-.338 2.5zM9.757 1.452l-1.184.389 1.523 2.112zM20.253 11.84 17.75 7.438c-.238-.353-.57-.584-.93-.643a.96.96 0 0 0-.753.183 1.13 1.13 0 0 0-.443.695c.014.019.03.033.044.053l2.352 4.138c1.614 2.95 1.1 5.771-1.525 8.395a7 7 0 0 1-.454.415c.997-.13 1.927-.61 2.773-1.457 2.705-2.704 2.517-5.585 1.438-7.377M12.066 9.01c-.129-.687.08-1.299.573-1.773l-2.062-2.063a1.123 1.123 0 0 0-1.555 0 1.1 1.1 0 0 0-.273.521z"
        clipRule="evenodd"
        fill="#ededed"
      ></path>
      <path
        fillRule="evenodd"
        d="M14.741 8.309c-.18-.267-.446-.455-.728-.502a.67.67 0 0 0-.533.127c-.146.113-.59.458-.199 1.296l1.184 2.503a.448.448 0 0 1-.236.755.445.445 0 0 1-.483-.248L7.614 6.106A.816.816 0 1 0 6.459 7.26l3.643 3.644a.446.446 0 1 1-.631.63L5.83 7.896l-1.03-1.03a.82.82 0 0 0-1.395.577.81.81 0 0 0 .24.576l1.027 1.028 3.643 3.643a.444.444 0 0 1-.144.728.44.44 0 0 1-.486-.098l-3.64-3.64a.82.82 0 0 0-1.335.263.81.81 0 0 0 .178.89l1.535 1.534 2.287 2.288a.445.445 0 0 1-.63.63l-2.287-2.288a.813.813 0 0 0-1.393.578c0 .216.086.424.238.577l4.403 4.403c2.79 2.79 5.495 4.119 8.681.931 2.269-2.271 2.708-4.588 1.342-7.086z"
        clipRule="evenodd"
        fill="#ededed"
      ></path>
    </svg>
  );
};
