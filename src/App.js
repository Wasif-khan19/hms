import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Falto from "./components/pages/falto";
import Home from "./components/pages/Home";
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
          <Route path="/falto" element={<Protectedroutes><Falto /></Protectedroutes>} />
          
        </Routes>
      )}
    </Router>
  );

};

export default App;
