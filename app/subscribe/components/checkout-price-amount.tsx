import { Skeleton } from '@/components/ui/skeleton';
import { CheckoutEventsData } from '@paddle/paddle-js/types/checkout/events';
import { formatMoney } from '../components/parse-money';

interface Props {
  checkoutData: CheckoutEventsData | null;
}

export function CheckoutPriceAmount({ checkoutData }: Props) {
  const total = checkoutData?.totals.total;
  return (
    <>
      {total !== undefined ? (
        <div className={'pt-8 flex gap-2 items-end justify-start'}>
          <span className={'text-5xl text-lightprimary-text dark:text-primary-text rubik'}>{formatMoney(total, checkoutData?.currency_code)}</span>
          <span className={'text-base text-lightprimary-text dark:text-primary-text leading-[16px] mb-1'}>inc. tax</span>
        </div>
      ) : (
        <Skeleton className="mt-8 h-[48px] w-full bg-[#a6a6a6] dark:bg-secondary-selection" />
      )}
    </>
  );
}
