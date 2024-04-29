import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RecipesView from "./views/RecipesView";
import Contact from "./views/Contact";
import Home from "./views/Home";
import ErrorPage from "./views/ErrorPage";
import RecipeDetails from "./views/RecipeDetails";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./views/Dashboard";
import Root from "./components/Root";
import { loader as recipeLoader } from "./views/RecipeDetails";

import "./style/global.scss";
import Register from "./views/Register";
import LogIn from "./views/LogIn";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "recipes",
          element: <RecipesView />,
        },
        {
          path: "recipes/:id",
          loader: recipeLoader,
          element: (
            <ProtectedRoute>
              <RecipeDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "dashboard",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "login",
          element: <LogIn />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
  ]);

  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  );
}

export default App;
