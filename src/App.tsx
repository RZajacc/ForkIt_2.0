import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Views
import RecipesView from "./views/RecipesView";
import Contact from "./views/Contact";
import Home from "./views/Home";
import ErrorPage from "./views/ErrorPage";
import RecipeDetails from "./views/RecipeDetails";
import Dashboard from "./views/Dashboard";
import Register from "./views/Register";
import LogIn from "./views/LogIn";
// Other
import Root from "./components/Root";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import "./style/global.scss";
// Loaders
import { loader as recipeLoader } from "./loaders/RecipeDetails.Loader";
import ResetPassword from "./views/ResetPassword";

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
        {
          path: "reset",
          element: <ResetPassword />,
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
