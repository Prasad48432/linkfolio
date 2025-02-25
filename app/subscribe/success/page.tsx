import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { LuLaptopMinimalCheck } from "react-icons/lu";

export default async function SuccessPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <main>
      <div className={"relative h-screen overflow-hidden"}>
        <div
          className={"absolute inset-0 px-6 flex items-center justify-center"}
        >
          <div className={"flex flex-col items-center text-white text-center"}>
            <LuLaptopMinimalCheck size={140} className="text-lightsuccess-selection dark:text-success-border"/>
            <h1
              className={
                "text-4xl font-medium pb-3"
              }
            >
              Payment successful
            </h1>
            <p className={"text-lg pb-16"}>
              Success! Your payment is complete, and you’re all set.
            </p>
            <Button variant={"secondary"} asChild={true}>
              {data.user ? (
                <Link href={"/dashboard"}>Go to Dashboard</Link>
              ) : (
                <Link href={"/"}>Go to Home</Link>
              )}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
