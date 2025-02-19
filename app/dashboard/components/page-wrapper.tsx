import { ReactNode } from 'react';

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col pt-4 px-4 space-y-2 bg-lightprimary-bg dark:bg-primary-bg flex-grow pb-4">
      {children}
    </div>
  );
}
