import { ChevronRight } from "lucide-react";
import { IoMailUnreadOutline } from "react-icons/io5";
import Link from "next/link";

export default function RegistrationConfirmation() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-primary-bg">
      <div className="w-[540px] bg-secondary-bg rounded-lg border-secondary-border">
        <div className="px-6 py-4 border-b border-secondary-strongerborder">
          <h2 className="text-2xl font-bold text-center">Check Your Email</h2>
        </div>
        <div className="px-6 py-4 text-center">
          <div className="flex items-center gap-4 justify-center mb-6">
            <img className="h-16 w-16 rounded-lg" src="/lf.png" />
            <span className="flex items-center justify-center gap-0.5">
              <ChevronRight className="h-8 w-8 text-primary-text" />
              <ChevronRight className="h-8 w-8 text-primary-text -ml-3" />
              <ChevronRight className="h-8 w-8 text-primary-text -ml-3" />
            </span>
            <IoMailUnreadOutline className="h-16 w-16 text-accent-text animate-pingCustom" />
          </div>
          <p className="text-primary-text mb-4">
            We've sent a confirmation link to your email address. Please check
            your inbox and click the link to activate your account.
          </p>
          <p className="text-sm text-secondary-text mb-4">
            If you don't see the email, please check your spam folder.
          </p>
          <Link
            href="/"
            className="text-sm mt-4 font-medium text-accent-text underline cursor-pointer"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
