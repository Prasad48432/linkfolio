import {Environment} from "@paddle/paddle-node-sdk";
import { Paddle } from "@paddle/paddle-node-sdk";
import { NextResponse } from "next/server";
import { ProcessWebhook } from "@/utils/paddle/processwebhook";

const paddle = new Paddle(process.env.PADDLE_SECRET_TOKEN!, {
  environment: Environment.sandbox,
});

const webhookProcessor = new ProcessWebhook();

export async function POST(req: Request) {
  const signature = (req.headers.get("paddle-signature") as string) || "";
  const rawRequestBody = (await req.text()) || "";
  const secretKey = process.env.NEXT_PUBLIC_WEBHOOK_SECRET_KEY || "";

  let status, eventName;

  try {
    if (signature && rawRequestBody) {
      const eventData = await paddle.webhooks.unmarshal(
        rawRequestBody,
        secretKey,
        signature
      );

      status = 200;
      eventName = eventData?.eventType ?? "Unknown event";
      if (eventData) {
        await webhookProcessor.processEvent(eventData);
      }
      // as { eventType: EventName; data: PaddleWebhookData };

      // database operation, and provision the user with stuff purchased
      // switch (eventData.eventType) {
      //   case EventName.SubscriptionCreated:
      //   case EventName.SubscriptionUpdated:
      //     await this.updateSubscriptionData(eventData);
      //     break;
      //   console.log(`subscription with id:${eventData.data.id} activated`);
      //   const { data: subData, error: subError } = await supabase
      //     .from("subscriptions")
      //     .insert({
      //       user_id: (eventData.data.customData as { user_id?: string })
      //         ?.user_id,
      //       subscription_id: eventData.data.id,
      //       subscription_product_id: eventData.data.items[0].product?.id,
      //       subscription_type: eventData.data.items[0].product?.name,
      //       subscription_variant: eventData.data.items[0].price?.name,
      //       unit_price: eventData.data.items[0].price?.unitPrice?.amount,
      //       currency: eventData.data.items[0].price?.unitPrice?.currencyCode,
      //       starts_at: eventData.data.currentBillingPeriod?.startsAt,
      //       ends_at: eventData.data.currentBillingPeriod?.endsAt,
      //       subscription_status: "active",
      //       created_at: eventData.data.createdAt,
      //     });
      //   break;
      // case EventName.SubscriptionCanceled:
      //   console.log(`subscription with id:${eventData.data.id} cancelled`);
      //   const { data: subCancelData, error: subCancelError } = await supabase
      //     .from("subscriptions")
      //     .update({
      //       subscription_status: "cancelled",
      //     })
      //     .eq("subscription_id", eventData.data.id);
      //   break;
      // case EventName.SubscriptionPastDue:
      //   console.log(`subscription with id:${eventData.data.id} is past due`);
      //   const { data: subPastDueData, error: subPastDueError } =
      //     await supabase
      //       .from("subscriptions")
      //       .update({
      //         subscription_status: "past_due",
      //       })
      //       .eq("subscription_id", eventData.data.id);
      //   break;
      // case EventName.SubscriptionUpdated:
      //   console.log(`subscription with id:${eventData.data.id} updated to ${eventData.data.status}`)
      //   const subscriptionStatus = eventData.data.status;
      //   let updatedStatus = "";

      //   if (subscriptionStatus === "canceled") {
      //     updatedStatus = "cancelled";
      //   } else if (subscriptionStatus === "past_due") {
      //     updatedStatus = "past_due";
      //   } else if (subscriptionStatus === "paused") {
      //     updatedStatus = "paused";
      //   }

      //   if (updatedStatus) {
      //     const { data, error } = await supabase
      //       .from("subscriptions")
      //       .update({
      //         subscription_status: updatedStatus,
      //       })
      //       .eq("subscription_id", eventData.data.id);

      //     if (error) {
      //       console.error("Failed to update subscription status:", error);
      //     }
      //   }
      //   break;
      // case EventName.SubscriptionPaused:
      //   console.log(`subscription with id:${eventData.data.id} updated to ${eventData.data.status}`)
      //   const { data: subPauseData, error: subPauseError } = await supabase
      //     .from("subscriptions")
      //     .update({
      //       subscription_status: "paused",
      //     })
      //     .eq("subscription_id", eventData.data.id);
      // case EventName.TransactionPaid:
      //   console.log(`Transaction with id:${eventData.data.id} was paid`);
      //   break;
      // case EventName.TransactionCanceled:
      //   console.log(`Transaction ${eventData.data.id} was Canceled`);
      //   break;
      // case EventName.TransactionCompleted:
      //   console.log(`Transaction with id:${eventData.data.id} was Completed`);
      //   const { data: payDataComp, error: payErrorComp } = await supabase
      //     .from("transactions")
      //     .insert({
      //       user_id: (eventData.data.customData as { user_id?: string })
      //         ?.user_id,
      //       transaction_id: eventData.data.id,
      //       subscription_id: eventData.data.subscriptionId,
      //       subscription_product_id: eventData.data.items[0].price?.productId,
      //       subscription_variant: eventData.data.items[0].price?.name,
      //       unit_price: eventData.data.items[0].price?.unitPrice?.amount,
      //       currency: eventData.data.items[0].price?.unitPrice?.currencyCode,
      //       transaction_status: "completed",
      //       created_at: eventData.data.createdAt,
      //     });
      //   break;
      // default:
      //   console.log(eventData.eventType);
      //  }
    } else {
      status = 400;
      console.log("Signature missing in header");
    }
  } catch (e) {
    status = 500;
    console.log(e);
  }

  // Return a response to acknowledge
  return NextResponse.json({ status, eventName });
}
