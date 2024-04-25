import { ReactNode, createContext, useState, useEffect } from "react";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";

// ? TYPES
interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
  register: (email: string, password: string) => void;
  loginEmail: (email: string, password: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthInitContext = {
  user: null,
  setUser: () => console.log("user not yet defined"),
  register: () => console.log("context not initialized"),
  loginEmail: () => console.log("User state not yet defined"),
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

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (error) {
      console.log("error", error);
    }
  };

  const loginEmail = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const loggedUser = userCredential.user;
      console.log(loggedUser);
      setUser(loggedUser);
    } catch (error) {
      console.log("Error ", error);
    }
  };

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
        loginEmail,
        logout,
        register,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
