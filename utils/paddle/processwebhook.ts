import {
    CustomerCreatedEvent,
    CustomerUpdatedEvent,
    EventEntity,
    EventName,
    SubscriptionCreatedEvent,
    SubscriptionUpdatedEvent,
  } from '@paddle/paddle-node-sdk';
  import { createClient } from '@/utils/supabase/server';
  
  export class ProcessWebhook {
    async processEvent(eventData: EventEntity) {
      switch (eventData.eventType) {
        case EventName.SubscriptionCreated:
        case EventName.SubscriptionUpdated:
          await this.updateSubscriptionData(eventData);
          break;
        case EventName.CustomerCreated:
        case EventName.CustomerUpdated:
        //   await this.updateCustomerData(eventData);
             console.log("customer updated");
          break;
      }
    }
  
    private async updateSubscriptionData(eventData: SubscriptionCreatedEvent | SubscriptionUpdatedEvent) {
      try {
        const supabase = createClient();
        const response = await supabase
          .from('subscriptions')
          .upsert({
            subscription_id: eventData.data.id,
            subscription_status: eventData.data.status,
            price_id: eventData.data.items[0].price?.id ?? '',
            product_id: eventData.data.items[0].price?.productId ?? '',
            scheduled_change: eventData.data.scheduledChange?.effectiveAt,
            customer_id: eventData.data.customerId,
          })
          .select();
        console.log(response);
      } catch (e) {
        console.error(e);
      }
    }
  
    private async updateCustomerData(eventData: CustomerCreatedEvent | CustomerUpdatedEvent) {
      try {
        const supabase = createClient();
        const response = await supabase
          .from('customers')
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