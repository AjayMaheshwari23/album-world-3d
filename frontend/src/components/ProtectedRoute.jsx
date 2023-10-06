import { useContext, useEffect } from "react";
import UserContext from "../UserContext";
export default function ProtectedRoute({ children }) {
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext.authData === null) {
      // redirect
    }
  }, [userContext.authData]);

  return (
    <>
      {userContext.loading ? (
        <h1>loading...</h1>
      ) : (
        userContext.authData !== null && <>{children}</>
      )}
    </>
  );
}
