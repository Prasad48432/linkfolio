import { CheckoutPriceAmount } from '../components/checkout-price-amount';
import { CheckoutEventsData } from '@paddle/paddle-js/types/checkout/events';
import { formatMoney } from '../components/parse-money';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  checkoutData: CheckoutEventsData | null;
}

export function CheckoutPriceContainer({ checkoutData }: Props) {
  const recurringTotal = checkoutData?.recurring_totals?.total;
  return (
    <>
      <div className={'text-lightprimary-text dark:text-primary-text text-lg leading-[20px] font-semibold'}>Order summary</div>
      <CheckoutPriceAmount checkoutData={checkoutData} />
      {recurringTotal !== undefined ? (
        <div className={'pt-4 text-base leading-[20px] font-medium text-muted-foreground rubik'}>
          then {formatMoney(checkoutData?.recurring_totals?.total, checkoutData?.currency_code)} monthly
        </div>
      ) : (
        <Skeleton className="mt-4 h-[20px] w-full bg-[#a6a6a6] dark:bg-secondary-selection" />
      )}
    </>
  );
}
