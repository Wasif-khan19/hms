import { Navigate } from "react-router-dom";

function Publicroute({ children }) {
  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

export default Publicroute;
