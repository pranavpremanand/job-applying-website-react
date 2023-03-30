import { Navigate } from "react-router-dom";

export const SuccessPageProtectRoute = (props) => {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user?.job_title !== undefined) {
      return props.children;
    } else {
    return <Navigate to={"/"} />;
  }
};
