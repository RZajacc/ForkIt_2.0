import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import RecipesView from "./views/RecipesView"
import Contact from "./views/Contact";
import Home from "./views/Home";
import ErrorPage from "./views/ErrorPage";
import RecipeDetails from "./views/RecipeDetails";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/global/ProtectedRoute";
import Dashboard from "./views/Dashboard";
import Account from "./views/Account";
import FavRecipeDetails from "./views/FavRecipeDetails";
import Root from "./components/global/Root";

import "./style/global.scss"

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children:[
        {
          index: true,
          element: <Home/>
        },
        {
          path: "recipes",
          element: <RecipesView />
        },
        {
          path: "recipes/:id",
          element: (
            <ProtectedRoute>
              <RecipeDetails/>
            </ProtectedRoute>
          )
        },
        {
          path: "dashboard",
          element: (
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          )
        },
        {
          path: "dashboard/:id",
          element: (
            <ProtectedRoute>
              <FavRecipeDetails/>
            </ProtectedRoute>
          )
        },
        {
          path: "contact",
          element: <Contact />
        },
        {
          path: "account",
          element: <Account/>
        }
      ]
    }
  ]);
 
  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  )
}

export default App
