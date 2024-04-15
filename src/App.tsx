import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import RecipesView from "./views/RecipesView"
import Contact from "./views/Contact";
import AppNav from "./components/AppNav";
import Home from "./views/Home";
import ErrorPage from "./views/ErrorPage";
import Footer from "./components/Footer";
import RecipeDetails from "./views/RecipeDetails";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./views/Dashboard";
import Account from "./views/Account";
import FavRecipeDetails from "./views/FavRecipeDetails";


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<ErrorPage />} >
        <Route index element={<Home />} />
        <Route path="recipes" element={<RecipesView />} />
        <Route path="recipes/:id" element={
          <ProtectedRoute>
            <RecipeDetails />
          </ProtectedRoute>
        } />
        <Route path="dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="dashboard/:id" element={
          <ProtectedRoute>
            <FavRecipeDetails />
          </ProtectedRoute>
        } />


        <Route path="contact" element={<Contact />} />
        <Route path="account" element={<Account />} />
      </Route>
    )
  );

  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  )
}

const Root = () => {
  return (
    <>
      <AppNav />
      <Outlet />
      <Footer />
    </>
  )
}
export default App
