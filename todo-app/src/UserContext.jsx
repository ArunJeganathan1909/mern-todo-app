import axios from "axios";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [fetched, setFetched] = useState(false); // Track if user data has been fetched

  useEffect(() => {
    if (!fetched) {
      axios
        .get('/account')
        .then((response) => {
          setUser(response.data);
          setFetched(true);
          setReady(true);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setFetched(true); // Ensure fetched is updated even in case of an error
          setReady(true); // Update ready state even in case of an error
        });
    } else {
      setReady(true); // Update ready state if user data has already been fetched
    }
  }, [fetched]);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
