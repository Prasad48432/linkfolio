import { ReactNode } from 'react';

export default function MarginWidthWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col md:ml-60 sm:border-r sm:border-lightsecondary-border dark:sm:border-secondary-border min-h-screen">
      {children}
    </div>
  );
}
