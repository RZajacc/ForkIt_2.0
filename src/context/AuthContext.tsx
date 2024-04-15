import { ReactNode, createContext, useState, useEffect } from "react";
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, GithubAuthProvider } from 'firebase/auth'
import { auth } from "../config/firebaseConfig";

// ? TYPES
interface AuthContextType {
  user: User | null,
  setUser: (user: User) => void,
  register: (email: string, password: string) => void,
  loginEmail: (email: string, password: string) => void,
  loginGoogle: () => void,
  loginGithub: () => void,
  loginFacebook: () => void,
  logout: () => void,
  loading: boolean,
}

const AuthInitContext = {
  user: null,
  setUser: () => console.log("user not yet defined"),
  register: () => console.log("context not initialized"),
  loginEmail: () => console.log("User state not yet defined"),
  loginGoogle: () => console.log("User state not yet defined"),
  loginGithub: () => console.log("User state not yet defined"),
  loginFacebook: () => console.log("User state not yet defined"),
  logout: () => console.log("User state not yet defined"),
  loading: true,
}

interface AuthContextProviderProps {
  children: ReactNode,
}


// ? 1- Create a Context
export const AuthContext = createContext<AuthContextType>(AuthInitContext);


// ? 2- Define content of our store

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ? -------------AUTH PROVIDERS LIST----------------
  const providerGoogle = new GoogleAuthProvider();
  const providerGithub = new GithubAuthProvider();
  const providerFacebook = new FacebookAuthProvider();

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.log("error", error);
    }
  }

  const loginEmail = async (email: string, password: string) => {

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedUser = userCredential.user;
      setUser(loggedUser);
    } catch (error) {
      console.log("Error ", error);
    }
  }

  const loginGoogle = async () => {

    try {
      const googleAuth = await signInWithPopup(auth, providerGoogle);
      // const credential = GoogleAuthProvider.credentialFromResult(googleAuth);
      setUser(googleAuth.user);
      googleAuth.user;
    } catch (error) {
      console.log(error)
    }
  }

  const loginGithub = async () => {
    try {
      const gitHubAuth = await signInWithPopup(auth, providerGithub);
      setUser(gitHubAuth.user);
    } catch (error) {
      console.log(error);
    }
  }


  const loginFacebook = async () => {
    try {
      const facebookAuth = await signInWithPopup(auth, providerFacebook);
      setUser(facebookAuth.user);
    } catch (error) {
      console.log(error)
    }
  }


  const logout = () => {
    signOut(auth).then(() => {
      setUser(null);
    }).catch((error) => {
      console.log("Error :>>", error)
    });

  }


  const checkIfUserIsActive = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }

  useEffect(() => {
    checkIfUserIsActive();
  }, [loading])



  return (
    <AuthContext.Provider value={{ user, setUser, loginEmail, loginGoogle, loginGithub, loginFacebook, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  )
}