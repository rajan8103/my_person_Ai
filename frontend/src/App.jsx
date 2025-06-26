import { BrowserRouter, Route, Routes } from "react-router-dom";
import Verify from "./pages/Verify";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { UserData } from "./context/UserContext";
import Loader from "./pages/Loader";

const App = () => {
  const { isAuth, user, loading } = UserData();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isAuth ? <Home /> : <Login />} />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
