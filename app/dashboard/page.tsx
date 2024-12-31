// // import { redirect } from "next/navigation";
// // import { createClient } from "@/utils/supabase/server";
// // import LogoutButton from "./LogoutButton";

// // export default async function Dashboard() {
// //   const supabase = createClient();
// //   const { data, error } = await supabase.auth.getUser();
// //   if (error || !data?.user) {
// //     redirect("/login");
// //   }

// //   return (
// //     <>
// //       <div>Dashboard</div>
// //       <p>Hello {data.user.email}</p>

// //       <LogoutButton />
// //     </>
// //   );
// // }

// "use client";
// import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
// import { IconType } from "react-icons";
// import {
//   FiBarChart,
//   FiChevronDown,
//   FiChevronsRight,
//   FiDollarSign,
//   FiHome,
//   FiMonitor,
//   FiShoppingCart,
//   FiTag,
//   FiUsers,
// } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { createClient } from "@/utils/supabase/client";
// import { User } from "@supabase/supabase-js";
// import { Loader2 } from "lucide-react";

// const Example = () => {
//   const [user, setUser] = useState<User | null>(null); // Explicitly define the state type
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const supabase = createClient();

//     // Get the current session
//     supabase.auth
//       .getSession()
//       .then(({ data }) => {
//         if (data.session) {
//           setUser(data.session.user);
//           console.log(data.session.user); // Set user if logged in
//         } else {
//           setUser(null); // Set user to null if not logged in
//         }
//         setLoading(false); // Stop loading after session check
//       })
//       .catch((err) => {
//         console.error("Error fetching session:", err);
//         setLoading(false); // Stop loading if there's an error
//       });
//   }, []);
//   return (
//     <div className="flex bg-primary-bg">
//       <Sidebar user={user} loading={loading} />
//       <ExampleContent />
//     </div>
//   );
// };

// const Sidebar = ({
//   user,
//   loading,
// }: {
//   user: User | null;
//   loading: boolean;
// }) => {
//   const [open, setOpen] = useState(true);
//   const [selected, setSelected] = useState("Dashboard");

//   return (
//     <motion.nav
//       layout
//       className="sticky top-0 h-screen shrink-0 border-r border-secondary-border bg-primary-bg p-2"
//       style={{
//         width: open ? "225px" : "fit-content",
//       }}
//     >
//       <TitleSection open={open} user={user} loading={loading} />

//       <div className="space-y-1">
//         <Option
//           Icon={FiHome}
//           title="Dashboard"
//           selected={selected}
//           setSelected={setSelected}
//           open={open}
//         />
//         <Option
//           Icon={FiDollarSign}
//           title="Sales"
//           selected={selected}
//           setSelected={setSelected}
//           open={open}
//         />
//         <Option
//           Icon={FiMonitor}
//           title="View Site"
//           selected={selected}
//           setSelected={setSelected}
//           open={open}
//         />
//         <Option
//           Icon={FiShoppingCart}
//           title="Products"
//           selected={selected}
//           setSelected={setSelected}
//           open={open}
//         />
//         <Option
//           Icon={FiTag}
//           title="Tags"
//           selected={selected}
//           setSelected={setSelected}
//           open={open}
//         />
//         <Option
//           Icon={FiBarChart}
//           title="Analytics"
//           selected={selected}
//           setSelected={setSelected}
//           open={open}
//         />
//         <Option
//           Icon={FiUsers}
//           title="Members"
//           selected={selected}
//           setSelected={setSelected}
//           open={open}
//         />
//       </div>

//       <ToggleClose open={open} setOpen={setOpen} />
//     </motion.nav>
//   );
// };

// const Option = ({
//   Icon,
//   title,
//   selected,
//   setSelected,
//   open,
// }: {
//   Icon: IconType;
//   title: string;
//   selected: string;
//   setSelected: Dispatch<SetStateAction<string>>;
//   open: boolean;
// }) => {
//   return (
//     <motion.button
//       layout
//       onClick={() => setSelected(title)}
//       className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
//         selected === title
//           ? "bg-secondary-selection text-primary-text"
//           : "text-primary-text hover:bg-secondary-bg"
//       }`}
//     >
//       <motion.div
//         layout
//         className="grid h-full w-10 place-content-center text-lg"
//       >
//         <Icon />
//       </motion.div>
//       {open && (
//         <motion.span
//           layout
//           initial={{ opacity: 0, y: 12 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.125 }}
//           className="text-xs font-medium"
//         >
//           {title}
//         </motion.span>
//       )}
//     </motion.button>
//   );
// };

// const TitleSection = ({
//   open,
//   user,
//   loading,
// }: {
//   open: boolean;
//   user: User | null;
//   loading: boolean;
// }) => {
//   return (
//     <div className="mb-3 border-b border-secondary-border pb-3">
//       <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-secondary-bg">
//         <div className="flex items-center gap-2">
//           <Logo user={user} />
//           {open && (
//             <motion.div
//               layout
//               initial={{ opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.125 }}
//             >
//               {loading ? (
//                 <div className="flex items-center gap-2">
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 </div>
//               ) : (
//                 <span className="block text-xs font-semibold truncate w-[80%]">
//                   {user?.email}
//                 </span>
//               )}
//               <span className="block text-xs text-slate-500">Pro Plan</span>
//             </motion.div>
//           )}
//         </div>
//         {open && <FiChevronDown className="mr-2" />}
//       </div>
//     </div>
//   );
// };

// const Logo = ({ user }: { user: User | null }) => {
//   // Temp logo from https://logoipsum.com/
//   return (
//     <motion.div
//       layout
//       className="flex h-12 w-12 place-content-center rounded-md"
//     >
//       <img className="rounded-md" referrerPolicy="no-referrer" src={user?.identities?.[0]?.identity_data?.avatar_url} alt="User Avatar" />
//     </motion.div>
//   );
// };

// const ToggleClose = ({
//   open,
//   setOpen,
// }: {
//   open: boolean;
//   setOpen: Dispatch<SetStateAction<boolean>>;
// }) => {
//   return (
//     <motion.button
//       layout
//       onClick={() => setOpen((pv) => !pv)}
//       className="absolute bottom-0 left-0 right-0 border-t border-secondary-border transition-colors hover:bg-secondary-bg"
//     >
//       <div className="flex items-center p-2">
//         <motion.div
//           layout
//           className="grid size-10 place-content-center text-lg"
//         >
//           <FiChevronsRight
//             className={`transition-transform ${open && "rotate-180"}`}
//           />
//         </motion.div>
//         {open && (
//           <motion.span
//             layout
//             initial={{ opacity: 0, y: 12 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.125 }}
//             className="text-xs font-medium"
//           >
//             Hide
//           </motion.span>
//         )}
//       </div>
//     </motion.button>
//   );
// };

// const ExampleContent = () => <div className="h-[200vh] w-full"></div>;

// export default Example;

import React, { ReactNode } from "react";
import SideNav from "./components/side-nav";
import MarginWidthWrapper from "./components/margin-width-wrapper";
import Header from "./components/header";
import HeaderMobile from "./components/header-mobile";
import PageWrapper from "./components/page-wrapper";


interface DashboardProps {
  children?: ReactNode;
}

const Dashboard = ({ children }: DashboardProps) => {
  return (
    <div className="flex bg-primary-bg">
      <SideNav />
      <main className="flex-1">
        <MarginWidthWrapper>
          <Header />
          <HeaderMobile />
          <PageWrapper>{children}</PageWrapper>
        </MarginWidthWrapper>
      </main>
    </div>
  );
};

export default Dashboard;
