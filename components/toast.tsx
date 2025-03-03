// import { toast } from "sonner";
// import { FaTimes } from "react-icons/fa";

// export const ToastError = ({
//   message,
//   duration = 1500,
// }: {
//   message: string;
//   duration?: number;
// }) => {
//   const toastId = toast.error(message, {
//     duration: duration,
//     style: {
//       background: "#121212",
//       color: "#ff1a1a",
//       border: "1px solid #333333",
//       borderRadius: "15px",
//       padding: "15px",
//     },
//     cancel: (
//       <FaTimes
//         onClick={() => toast.dismiss(toastId)}
//         className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 bg-transparent text-primary-text/70 hover:text-primary-text/90 duration-200 transition-all ease-out"
//       />
//     ),
//   });
// };

// export const ToastSuccess = ({
//   message,
//   duration = 1500,
// }: {
//   message: string;
//   duration?: number;
// }) => {
//   const toastId = toast.success(message, {
//     cancel: (
//       <FaTimes
//         onClick={() => toast.dismiss(toastId)}
//         className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 bg-transparent text-primary-text/70 hover:text-primary-text/90 duration-200 transition-all ease-out"
//       />
//     ),
//     duration: duration,
//     style: {
//       background: "#121212",
//       color: "#2eb82e",
//       border: "1px solid #333333",
//       borderRadius: "15px",
//       padding: "15px",
//     },
//   });
// };



import { toast } from "sonner";
import { FaTimes } from "react-icons/fa";

export const ToastError = ({
  message,
  duration = 1500,
}: {
  message: string;
  duration?: number;
}) => {
  const toastId = toast.error(message, {
    duration: duration,
    style: {
      background: "rgb(77 35 29)",
      color: "#ededed",
      border: "1px solid rgb(230 86 60/0.8)",
      borderRadius: "15px",
      padding: "15px",
    },
    cancel: (
      <FaTimes
        onClick={() => toast.dismiss(toastId)}
        className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 bg-transparent text-primary-text/70 hover:text-primary-text/90 duration-200 transition-all ease-out"
      />
    ),
  });
};

export const ToastSuccess = ({
  message,
  duration = 1500,
}: {
  message: string;
  duration?: number;
}) => {
  const toastId = toast.success(message, {
    cancel: (
      <FaTimes
        onClick={() => toast.dismiss(toastId)}
        className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 bg-transparent text-primary-text/70 hover:text-primary-text/90 duration-200 transition-all ease-out"
      />
    ),
    duration: duration,
    style: {
      background: "#004d2d",
      color: "#ededed",
      border: "1px solid rgb(62 207 142/0.8)",
      borderRadius: "15px",
      padding: "15px",
    },
  });
};
