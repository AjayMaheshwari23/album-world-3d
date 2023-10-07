import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CONFIG from './config'
const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [authData, setAuthData] = useState(null);
const navigate = useNavigate();
  useEffect(() => {
    async function checkAuth() {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        console.log("token = "+ token);
        if (token == null) {
          throw new Error("Token not found...");
        }
        const url = CONFIG.backend_url + "/api/auth/getuser";
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            jwToken: token,
          }),
        });

        //  for Development Reasons !!
        // const dat = {  };
        // setAuthData(dat);
        // return;
        // --------------------

        console.log("protected route is called");

        if (!response.ok) throw new Error("Something went wrong...");
        const json = await response.json();
        if (json.data === null) { navigate("/"); throw new Error("Unauthorized");}
        setAuthData(json.data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loading,
        authData,
        setAuthData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
