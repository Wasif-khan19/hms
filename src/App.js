import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Doctor from "./components/pages/Admin/Doctor";
import ApplyDoctor from "./components/pages/ApplyDoctor";
import { Falto } from "./components/pages/Falto";
import Home from "./components/pages/Home";
import Notification from "./components/pages/NotificationPage";
import Protectedroutes from "./components/routes/Protectedroutes";
import Publicroute from "./components/routes/Publicroute";
import Spinner from "./components/ui/Spinner";
import User from "./components/pages/Admin/User";
import Profile from "./components/pages/doctor/Profile";

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
          <Route path="/falto" element={<Protectedroutes><Falto/></Protectedroutes>} />
          
          <Route path="/apply-doctor" element={<Protectedroutes><ApplyDoctor/></Protectedroutes>} />
          <Route path="/notification" element={<Protectedroutes><Notification/></Protectedroutes>} />
          <Route path="/admin/user" element={<Protectedroutes><User/></Protectedroutes>} />
          <Route path="/admin/doctor" element={<Protectedroutes><Doctor/></Protectedroutes>} />
          <Route path="/doctor/profile/:id" element={<Protectedroutes><Profile/></Protectedroutes>} />
          
          
        </Routes>
      )}
    </Router>
  );

};

export default App;
