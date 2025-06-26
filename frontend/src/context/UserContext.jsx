import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { server } from "../main";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState([]);

  async function loginUser(email, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/login`, { email });
      toast.success(data.message);
      localStorage.setItem("verifyToken", data.verifyToken);
      navigate("/verify");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false);
    }
  }

  async function verifyUser(otp, navigate) {
    const verifyToken = localStorage.getItem("verifyToken");

    if (!verifyToken) {
      toast.error("Please Give Token");
      return;
    }

    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/verify`, {
        otp,
        verifyToken,
      });
      toast.success(data.message);
      localStorage.clear();
      localStorage.setItem("token", data.token);

      setIsAuth(true);
      setUser(data.user);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false);
    }
  }
  const [loading, setLoading] = useState(true);
  async function fetchUser() {
    try {
      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setUser(data);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setIsAuth(false);
      setLoading(false);
    }
  }

  const logoutHandler = (navigate) => {
    localStorage.clear();
    setIsAuth(false);
    setUser([]);
    toast.success("Logout Successfully");
    navigate("/login");
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <UserContext.Provider
      value={{
        loginUser,
        verifyUser,
        btnLoading,
        isAuth,
        setIsAuth,
        user,
        setUser,
        loading,
        logoutHandler,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
