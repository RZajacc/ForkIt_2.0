import { ReactNode, createContext, useState, useEffect } from "react";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

// ? TYPES
interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthInitContext = {
  user: null,
  setUser: () => console.log("user not yet defined"),
  register: () => console.log("context not initialized"),
  logout: () => console.log("User state not yet defined"),
  loading: true,
};

interface AuthContextProviderProps {
  children: ReactNode;
}

// ? 1- Create a Context
export const AuthContext = createContext<AuthContextType>(AuthInitContext);

// ? 2- Define content of our store
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log("Error :>>", error);
      });
  };

  const checkIfUserIsActive = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    checkIfUserIsActive();
  }, [loading]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
