"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Info, Loader } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { ToastError, ToastSuccess } from "@/components/toast";

const CommentBox = ({
  blogId,
  authorId,
}: {
  blogId: string;
  authorId: string;
}) => {
  const supabase = createClient();
  const [isExpanded, setIsExpanded] = useState(false);
  const [comment, setComment] = useState("");
  const [profileData, setProfileData] = useState({
    id: "",
    username: "",
    full_name: "",
    avatar_url: "",
  });
  const [fetchLoading, setFetchLoading] = useState(true);
  const [postingComment, setPostingComment] = useState(false);

  const fetchProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("id, username, full_name, avatar_url")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error.message);
        } else {
          setProfileData(data);
        }
      }
    } catch (error) {
      console.error("Error retrieving profile data:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  const publishComment = async () => {
    setPostingComment(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();


      const { data, error } = await supabase.from("comments").insert({
        blog_id: blogId,
        author_id: authorId,
        user_id: user?.id,
        comment: comment,
      });
      if (error) {
        ToastError({ message: "Error posting comment." });
      } else {
        setComment("");
        ToastSuccess({ message: "Comment posted successfully." });
      }
    } catch (error) {
      ToastError({ message: "An unexpected error occurred." });
    } finally {
      setPostingComment(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <motion.div
      className="w-full mb-3"
      initial={false}
      animate={{ height: isExpanded ? "auto" : "fit" }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Profile Info (Hidden initially) */}
      <motion.div
        className={`flex items-center p-2 gap-2 mb-2 overflow-hidden ${
          isExpanded ? "block" : "hidden"
        }`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : -10 }}
        transition={{ duration: 0.2 }}
      >
        {fetchLoading ? (
          <Loader strokeWidth={1} className="animate-spin" />
        ) : (
          <>
            <img
              src={profileData.avatar_url} // User Avatar
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-normal">{profileData.full_name}</span>
          </>
        )}
      </motion.div>

      {/* Input Field */}
      <div className="relative flex items-center">
        <input
          type="text"
          className="w-full px-3 py-2 font-light border rounded-full focus:outline-none border-secondary-border bg-secondary-bg focus:border-secondary-strongerborder transition-all duration-200 ease-out"
          placeholder="Share your thoughts"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onFocus={() => setIsExpanded(true)}
        />
        {!isExpanded && (
          <button
            className="absolute opacity-50 right-2 bg-accent-bg text-primary-text font-light px-3 py-1 rounded-full border border-accent-border"
            onClick={() => setIsExpanded(true)}
          >
            Comment
          </button>
        )}
      </div>

      <div className="flex items-center justify-between px-3">
        <motion.div
          className={`flex items-center text-sm font-light justify-start gap-1 mt-3 overflow-hidden ${
            isExpanded ? "block" : "hidden"
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : 10 }}
          transition={{ duration: 0.2 }}
        >
          <Info strokeWidth={1} size={15} />
          linkfolio community guidelines
        </motion.div>
        <motion.div
          className={`flex justify-end gap-2 mt-3 overflow-hidden ${
            isExpanded ? "block" : "hidden"
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : 10 }}
          transition={{ duration: 0.2 }}
        >
          <button className="underline" onClick={() => setIsExpanded(false)}>
            Cancel
          </button>
          <button
            disabled={!comment.trim() || postingComment}
            onClick={() => publishComment()}
            className="bg-accent-bg w-36 flex items-center justify-center disabled:opacity-50 text-primary-text font-light px-3 py-1 rounded-full border border-accent-border"
          >
            {postingComment ? (
              <Loader strokeWidth={1} className="animate-spin" />
            ) : (
              "Post Comment"
            )}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CommentBox;
