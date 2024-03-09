import { ReactNode } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = ({
  type,
  content,
}: {
  type: "success" | "warn" | "error" | "default";
  content: string | ReactNode;
}) => {
  switch (type) {
    case "success":
      return toast.success(content);
    case "warn":
      return toast.warning(content);
    case "error":
      return toast.error(content);
    case "default":
      return toast(content);
  }
};

const Toast = () => {
  return (
    <ToastContainer
      position="top-center"
      draggable
      pauseOnHover
      autoClose={1500}
      limit={1}
    />
  );
};

export default Toast;
