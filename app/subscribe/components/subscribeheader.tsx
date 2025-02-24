import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function SubscribeHeader() {
  return (
    <div className={"flex gap-4 items-center justify-start"}>
      <Link href={"/"}>
        <Button
          variant={"secondary"}
          className={
            "h-[32px] hover:bg-lightsecondary-bg bg-lightsecondary-selection dark:hover:bg-secondary-selection dark:bg-secondary-bg text-lightprimary-text dark:text-primary-text border-border w-[32px] p-0 rounded-[4px]"
          }
        >
          <ChevronLeft />
        </Button>
      </Link>
      <Image
        className="w-[124px] h-[24px] block dark:hidden"
        src="/darkheaderlogo.png"
        alt="Header Logo"
        width={124}
        height={24}
        priority
      />
      <Image
        className="w-[124px] h-[24px] hidden dark:block"
        src="/headerlogo.png"
        alt="Header Logo Dark"
        width={124}
        height={24}
        priority
      />
    </div>
  );
}
