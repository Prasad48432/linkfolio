import { Environment, EventName } from "@paddle/paddle-node-sdk";
import { Paddle } from "@paddle/paddle-node-sdk";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

const paddle = new Paddle(process.env.PADDLE_SECRET_TOKEN!, {
  environment: Environment.sandbox,
});

export async function POST(req: Request) {
  const supabase = createClient();
  const signature = (req.headers.get("paddle-signature") as string) || "";
  // req.body should be of type `buffer`, convert to string before passing it to `unmarshal`.
  // If express returned a JSON, remove any other middleware that might have processed raw request to object
  const rawRequestBody = (await req.text()) || "";
  // Replace `WEBHOOK_SECRET_KEY` with the secret key in notifications from vendor dashboard
  const secretKey = process.env.NEXT_PUBLIC_WEBHOOK_SECRET_KEY || "";

  // type PaddleWebhookData = {
  //   customData?: { user_id?: string };
  //   id: string;
  //   items: {
  //     product?: { name?: string };
  //     price?: {
  //       name?: string;
  //       unitPrice?: { amount?: number; currencyCode?: string };
  //     };
  //   }[];
  //   createdAt: string;
  // };

  try {
    if (signature && rawRequestBody) {
      // The `unmarshal` function will validate the integrity of the webhook and return an entity
      const eventData = await paddle.webhooks.unmarshal(
        rawRequestBody,
        secretKey,
        signature
      );
      // as { eventType: EventName; data: PaddleWebhookData };

      const { data: user, error: usererror } = await supabase.auth.getUser();

      // database operation, and provision the user with stuff purchased
      switch (eventData.eventType) {
        case EventName.SubscriptionActivated:
          const { data: subData, error: subError } = await supabase
            .from("subscriptions")
            .insert({
              user_id: (eventData.data.customData as { user_id?: string })
                ?.user_id,
              subscription_id: eventData.data.id,
              subscription_product_id: eventData.data.items[0].product?.id,
              subscription_type: eventData.data.items[0].product?.name,
              subscription_variant: eventData.data.items[0].price?.name,
              unit_price: eventData.data.items[0].price?.unitPrice?.amount,
              currency: eventData.data.items[0].price?.unitPrice?.currencyCode,
              starts_at: eventData.data.currentBillingPeriod?.startsAt,
              ends_at: eventData.data.currentBillingPeriod?.endsAt,
              subscription_status: "active",
              created_at: eventData.data.createdAt,
            });
          break;
        case EventName.SubscriptionCanceled:
          const { data: subCancelData, error: subCancelError } = await supabase
            .from("subscriptions")
            .update({
              subscription_status: "cancelled",
            })
            .eq("subscription_id", eventData.data.id);
          break;
        case EventName.SubscriptionPastDue:
          const { data: subPastDueData, error: subPastDueError } =
            await supabase
              .from("subscriptions")
              .update({
                subscription_status: "past_due",
              })
              .eq("subscription_id", eventData.data.id);
          break;
        case EventName.SubscriptionUpdated:
          console.log(`subscription ${eventData.data.id} updated to ${eventData.data.status}`)
          const subscriptionStatus = eventData.data.status;
          let updatedStatus = "";

          if (subscriptionStatus === "canceled") {
            updatedStatus = "cancelled";
          } else if (subscriptionStatus === "past_due") {
            updatedStatus = "past_due";
          } else if (subscriptionStatus === "paused") {
            updatedStatus = "paused";
          }

          if (updatedStatus) {
            const { data, error } = await supabase
              .from("subscriptions")
              .update({
                subscription_status: updatedStatus,
              })
              .eq("subscription_id", eventData.data.id);

            if (error) {
              console.error("Failed to update subscription status:", error);
            }
          }
          break;
        case EventName.SubscriptionPaused:
          const { data: subPauseData, error: subPauseError } = await supabase
            .from("subscriptions")
            .update({
              subscription_status: "paused",
            })
            .eq("subscription_id", eventData.data.id);
        case EventName.TransactionPaid:
          console.log(`Payment ${eventData.data.id} was Paid`);
          break;
        case EventName.TransactionCanceled:
          console.log(`Transaction ${eventData.data.id} was Canceled`);
          break;
        case EventName.TransactionCompleted:
          const { data: payDataComp, error: payErrorComp } = await supabase
            .from("transactions")
            .insert({
              user_id: (eventData.data.customData as { user_id?: string })
                ?.user_id,
              transaction_id: eventData.data.id,
              subscription_id: eventData.data.subscriptionId,
              subscription_product_id: eventData.data.items[0].price?.productId,
              subscription_variant: eventData.data.items[0].price?.name,
              unit_price: eventData.data.items[0].price?.unitPrice?.amount,
              currency: eventData.data.items[0].price?.unitPrice?.currencyCode,
              transaction_status: "completed",
              created_at: eventData.data.createdAt,
            });
          console.log(`Transaction ${eventData.data.id} was Completed`);
          break;
        default:
          console.log(eventData.eventType);
      }
    } else {
      console.log("Signature missing in header");
    }
  } catch (e) {
    // Handle signature mismatch or other runtime errors
    console.log(e);
  }

  // Return a response to acknowledge
  return NextResponse.json({ ok: true });
}
