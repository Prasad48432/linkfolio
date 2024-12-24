import { Mail } from "lucide-react";

export default function RegistrationConfirmation() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[540px] bg-white text-center shadow-md p-6 rounded-md">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Check Your Email</h2>
        </div>
        <div className="flex justify-center mb-6">
          <Mail className="h-16 w-16 text-blue-500" />
        </div>
        <p className="text-gray-600 mb-4">
          We've sent a password reset link to your email address. Please check
          your inbox and click the link to reset your password.
        </p>
        <p className="text-sm text-gray-500">
          If you don't see the email, please check your spam folder.
        </p>
      </div>
    </main>
  );
}
