"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

const words = ["Startup ", "Project ", "Creation ", "Skills ", "Journey ", "Earnings ", "Blogs ", "Career "];

interface FlipWordsProps {
  duration?: number;
  className?: string;
}

export const FlipWords: React.FC<FlipWordsProps> = ({
  duration = 3000,
  className,
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const startAnimation = useCallback(() => {
    const word = words[(words.indexOf(currentWord) + 1) % words.length];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord]);

  useEffect(() => {
    if (!isAnimating) {
      const timerId = setTimeout(() => {
        setIsFirstRender(false); // Ensure subsequent animations run normally
        startAnimation();
      }, duration);
      return () => clearTimeout(timerId); // Cleanup timeout
    }
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <motion.div
        initial={isFirstRender ? {} : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
        exit={{
          opacity: 0,
          y: -40,
          x: 40,
          filter: "blur(8px)",
          scale: 2,
          position: "absolute",
        }}
        className={cn("z-10 inline-block relative", className)}
        key={currentWord}
      >
        {currentWord.split("").map((letter, index) => (
          <motion.span
            key={currentWord + index}
            initial={
              isFirstRender
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 10, filter: "blur(8px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: isFirstRender ? 0 : index * 0.08,
              duration: 0.4,
            }}
            className="inline-block text-primarytext"
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
