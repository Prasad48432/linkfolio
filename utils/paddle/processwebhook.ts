import {
  CustomerCreatedEvent,
  CustomerUpdatedEvent,
  EventEntity,
  EventName,
  SubscriptionCreatedEvent,
  SubscriptionUpdatedEvent,
} from "@paddle/paddle-node-sdk";
import { createClient } from "@/utils/supabase/server";

export class ProcessWebhook {
  async processEvent(eventData: EventEntity) {
    switch (eventData.eventType) {
      case EventName.SubscriptionCreated:
        await this.updateSubscriptionData(eventData);
        break;
      case EventName.CustomerCreated:
      case EventName.CustomerUpdated:
        //   await this.updateCustomerData(eventData);
        console.log("customer updated");
        break;
    }
  }

  private async updateSubscriptionData(
    eventData: SubscriptionCreatedEvent | SubscriptionUpdatedEvent
  ) {
    try {
      const supabase = createClient();
      const response = await supabase.from("subscriptions").insert({
        user_id: (eventData.data.customData as { user_id?: string })?.user_id,
        paddle_customer_id: eventData.data.customerId,
        subscription_id: eventData.data.id,
        price_id: eventData.data.items[0].price?.id ?? "",
        product_id: eventData.data.items[0].price?.productId ?? "",
        subscription_type: eventData.data.items[0].product?.name,
        subscription_variant: eventData.data.items[0].price?.name,
        subscription_status: eventData.data.status,
        starts_at: eventData.data.currentBillingPeriod?.startsAt,
        ends_at: eventData.data.currentBillingPeriod?.endsAt,
      });
    } catch (e) {
      console.error(e);
    }
  }

  private async updateCustomerData(
    eventData: CustomerCreatedEvent | CustomerUpdatedEvent
  ) {
    try {
      const supabase = createClient();
      const response = await supabase
        .from("customers")
        .upsert({
          customer_id: eventData.data.id,
          email: eventData.data.email,
        })
        .select();
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  }
}
