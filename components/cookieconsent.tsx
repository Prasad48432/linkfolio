"use client";
import { useEffect, useState } from "react";
import { RxCookie } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 2000); 
  
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowConsent(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "false");
    setShowConsent(false);
  };

  const slideUpAnimation = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 100 },
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          className="bg-primary-bg fixed flex flex-col gap-2 items-center justify-center z-[90] bottom-1 left-1 sm:bottom-2 w-[98vw] sm:w-[24rem] sm:left-2 sm:translate-x-0 p-4 border border-secondary-border rounded-md text-primary-text"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={slideUpAnimation}
          transition={{ duration: 0.5 }}
        >
          <RxCookie className="mb-2" size={60} />
          <p className="text-primarytext text-center mb-4 text-sm">
            We store cookies for better security and user experience, we never
            collect any personal data.
          </p>
          <span className="flex gap-2 w-full items-center justify-center">
            <button
              onClick={handleReject}
              className="bg-secondary-bg w-1/3 border border-secondary-border hover:bg-secondary-selection hover:border-secondary-strongerborder transition-all duration-200 ease-out px-3 py-1.5 rounded text-sm font-semibold"
            >
              Reject All
            </button>
            <button
              onClick={handleAccept}
              className="w-2/3 bg-accent-bg border border-accent-border hover:bg-accent-selection hover:border-accent-strongerborder transition-all duration-200 ease-out px-3 py-1.5 rounded text-sm font-semibold"
            >
              Accept All
            </button>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
