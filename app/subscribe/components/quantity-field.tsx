import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  quantity: number;
  handleQuantityChange: (quantity: number) => void;
}

export function QuantityField({ handleQuantityChange, quantity }: Props) {
  return (
    <div
      className={
        "mt-3 bg-lightsecondary-selection dark:bg-secondary-bg gap-1 w-fit flex items-center border border-lightsecondary-border/40 dark:border-secondary-border rounded-md p-[6px]"
      }
    >
      <Button
        disabled
        variant={"secondary"}
        className={
          "h-[32px] bg-lightsecondary-selection dark:bg-secondary-bg text-lightprimary-text dark:text-primary-text border-border w-[32px] p-0 rounded-[4px]"
        }
      >
        <Minus />
      </Button>
      <span
        className={
          "text-center leading-[24px] bg-lightsecondary-bg/60 dark:bg-secondary-bg text-lightprimary-text dark:text-primary-text rounded-[4px] w-[56px] px-2 py-1 text-xs"
        }
      >
        {quantity}
      </span>
      <Button
        disabled
        variant={"secondary"}
        className={
          "h-[32px] bg-lightsecondary-selection dark:bg-secondary-bg text-lightprimary-text dark:text-primary-text border-border w-[32px] p-0 rounded-[4px]"
        }
        onClick={() => handleQuantityChange(quantity + 1)}
      >
        <Plus />
      </Button>
    </div>
  );
}
