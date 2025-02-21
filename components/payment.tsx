// "use client";

// import { initializePaddle, Paddle } from "@paddle/paddle-js";
// import { useEffect, useState } from "react";

// export default function Payment() {
//   const [paddle, setPaddle] = useState<Paddle>();

//   useEffect(() => {
//     initializePaddle({
//       environment: "sandbox",
//       token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
//     }).then((paddle) => setPaddle(paddle));
//   }, []);

//   const handleCheckout = () => {
//     if (!paddle) return alert("Paddle not initialized");

//     paddle.Checkout.open({
//       items: [{ priceId: "pri_01jmhnq6br4deebqs25bq3bjew", quantity: 1 }],
//       settings: {
//         displayMode: "overlay",
//         theme: "dark",
//         successUrl: "http://localhost:3000/success",
//       },
//     });
//   };

//   return (
//     <button
//       className="bg-blue-500 text-white px-4 py-2 rounded-md"
//       onClick={handleCheckout}
//     >
//       Proceed to payment
//     </button>
//   );
// }