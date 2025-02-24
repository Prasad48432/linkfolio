import { createClient } from "@/utils/supabase/server";
import { SubscribeHeader } from "../components/subscribeheader";
import { CheckoutContents } from "../components/subscribecontents";

export default async function CheckoutPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return (
    <div className={"w-full bg-lightprimary-bg dark:bg-primary-bg min-h-screen relative overflow-hidden"}>
      <div
        className={
          "mx-auto max-w-6xl relative px-[16px] md:px-[32px] py-[24px] flex flex-col gap-6 justify-between"
        }
      >
        <SubscribeHeader />
        <CheckoutContents userEmail={data.user?.email} />
      </div>
    </div>
  );
}
