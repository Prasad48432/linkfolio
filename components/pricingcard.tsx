import React from "react";

const PricingCard = () => {
  return (
    // <div className="relative flex justify-center scale-95">
    //   <div className="flex flex-col p-6 mx-auto w-full bg-lightprimary-lighter dark:bg-primary-lighter max-w-lg text-center text-lightprimary-text dark:text-primary-text rounded-lg border card-shard shadow xl:p-8">
    //     <h3 className="mb-1 text-2xl font-semibold">LF Pro</h3>
    //     <p className="font-light sm:text-lg text-lightprimary-text/80 dark:text-primary-text/80">
    //       Best for limited Entries.
    //     </p>
    //     <div className="flex justify-center items-baseline my-6">
    //       <span className="mr-2 text-2xl lg:text-3xl font-extrabold">₹79</span>
    //       <span className="text-lightprimary-text/80 dark:text-primary-text/80">
    //         /month
    //       </span>
    //     </div>
    //     <ul
    //       role="list"
    //       className="mb-8 space-y-2.5 text-left text-sm lg:text-base"
    //     >
    //       <li className="flex items-center space-x-3">
    //         <svg
    //           className="flex-shrink-0 w-5 h-5 text-yellow-500 dark:text-yellow-400"
    //           fill="currentColor"
    //           viewBox="0 0 20 20"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path
    //             fillRule="evenodd"
    //             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
    //             clipRule="evenodd"
    //           ></path>
    //         </svg>
    //         <span>
    //           Validity: <span className="font-semibold">1 Month</span>
    //         </span>
    //       </li>
    //       <li className="flex items-center space-x-3">
    //         <svg
    //           className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
    //           fill="currentColor"
    //           viewBox="0 0 20 20"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path
    //             fillRule="evenodd"
    //             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
    //             clipRule="evenodd"
    //           ></path>
    //         </svg>
    //         <span>
    //           Max size: <span className="font-semibold">4 Entries</span>
    //         </span>
    //       </li>
    //       <li className="flex items-center space-x-3">
    //         <X
    //           className="text-lightdanger-border dark:text-red-500"
    //           size={16}
    //         />
    //         <span>
    //           Access to{" "}
    //           <span className="font-semibold cursor-pointer line-through">
    //             Themes
    //           </span>{" "}
    //           and{" "}
    //           <span className="font-semibold cursor-pointer line-through">
    //             Fonts
    //           </span>
    //         </span>
    //       </li>
    //       <li className="flex items-center space-x-3">
    //         <X
    //           className="text-lightdanger-border dark:text-red-500"
    //           size={16}
    //         />
    //         <span>
    //           Intergrate{" "}
    //           <span className="font-semibold cursor-pointer line-through">
    //             Revenue
    //           </span>
    //         </span>
    //       </li>
    //       <li className="flex items-center space-x-3">
    //         <X
    //           className="text-lightdanger-border dark:text-red-500"
    //           size={16}
    //         />
    //         <span>
    //           Access to{" "}
    //           <span className="font-semibold cursor-pointer line-through">
    //             Analytics
    //           </span>
    //         </span>
    //       </li>
    //     </ul>
    //     <CheckoutButton
    //       user={user}
    //       priceId="pri_01jmkchaz4z34135mqy9wfbx6w"
    //       buttonText="Subscribe"
    //       paddle={paddle}
    //     />
    //   </div>
    // </div>
    <></>
  );
};

// const CheckoutButton = ({
//     priceId,
//     user,
//     buttonText,
//     paddle,
//   }: {
//     priceId: string;
//     user: User | null;
//     buttonText: string;
//     paddle: Paddle | undefined;
//   }) => {
//     const [paymentLoading, setPaymentLoading] = useState(false);
  
//     const handleCheckout = async ({ priceId }: { priceId: string }) => {
//       if (!paddle) return alert("Paddle not initialized");
  
//       const supabase = createClient();
//       const { data: user, error } = await supabase.auth.getUser();
  
//       if (error || !user?.user?.id) {
//         ToastError({ message: "No user Logged in." });
//         return;
//       }
  
//       setPaymentLoading(true);
  
//       // Detect system theme preference
//       const prefersDarkMode = window.matchMedia(
//         "(prefers-color-scheme: dark)"
//       ).matches;
//       const theme = prefersDarkMode ? "dark" : "light";
  
//       paddle.Checkout.open({
//         items: [{ priceId: priceId, quantity: 1 }],
//         customData: {
//           user_id: user.user.id, // Pass user ID to Paddle
//         },
//         // customer: {
//         //   email: user?.user?.email || "",
//         // },
//         settings: {
//           displayMode: "overlay",
//           theme: theme,
//           successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
//         },
//       });
      
  
      
//     };
//     return (
//       <>
//         {!user ? (
//           <Link
//             href="/login?next=/#pricing"
//             className="text-lightprimary-text bg-lightaccent-bg border-lightaccent-border hover:bg-lightaccent-selection hover:border-lightaccent-strongerborder dark:text-primary-text dark:bg-accent-bg border dark:border-accent-border dark:hover:bg-accent-selection dark:hover:border-accent-strongerborder transition-all duration-150 ease-in-out font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//           >
//             Get started
//           </Link>
//         ) : (
//           <button
//             onClick={() =>
//               handleCheckout({
//                 priceId: priceId,
//               })
//             }
//             className="cursor-pointer h-[45px] flex items-center justify-center text-lightprimary-text bg-lightaccent-bg border-lightaccent-border hover:bg-lightaccent-selection hover:border-lightaccent-strongerborder dark:text-primary-text dark:bg-accent-bg border dark:border-accent-border dark:hover:bg-accent-selection dark:hover:border-accent-strongerborder transition-all duration-150 ease-in-out font-normal rounded-lg px-5 py-2.5 text-center"
//           >
//             {paymentLoading ? (
//               <Loader className="animate-spin w-4 h-4 text-lightprimary-text dark:text-primary-text" />
//             ) : (
//               <>{buttonText}</>
//             )}
//           </button>
//         )}
//       </>
//     );
//   };

export default PricingCard;
