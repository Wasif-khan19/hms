import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ApplyDoctor from "./components/pages/ApplyDoctor";
import Home from "./components/pages/Home";
import Notification from "./components/pages/NotificationPage";
import Protectedroutes from "./components/routes/Protectedroutes";
import Publicroute from "./components/routes/Publicroute";
import Spinner from "./components/ui/Spinner";

const App = () => {
  const { loading } = useSelector((state) => state.alert);

  return (
    
    <Router>
      {loading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route path="/signup" element={<Publicroute><Signup/></Publicroute>} />
          <Route path="/login" element={<Publicroute><Login/></Publicroute>} />
          <Route path="/" element={<Protectedroutes><Home /></Protectedroutes>} />
          
          <Route path="/apply-doctor" element={<Protectedroutes><ApplyDoctor/></Protectedroutes>} />
          <Route path="/notification" element={<Protectedroutes><Notification/></Protectedroutes>} />
          
        </Routes>
      )}
    </Router>
  );

};

export default App;
