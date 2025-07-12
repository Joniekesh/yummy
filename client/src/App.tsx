import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "sonner";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import NotFound from "./components/NotFound";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Foods from "./pages/Foods";
import Contact from "./pages/Contact";
import About from "./pages/About";
import type React from "react";
import Category from "./pages/Category";
import Product from "./pages/Product";
import AdminMenu from "./components/admin/AdminMenu";
import AdminHeader from "./components/admin/AdminHeader";
import Admin from "./pages/admin/Admin";
import Analytics from "./pages/admin/Analytics";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Users from "./pages/admin/Users";
import Categories from "./pages/admin/Categories";
import Pay from "./pages/Pay";
import UserHeader from "./components/user/UserHeader";
import User from "./pages/user/User";
import CompletePage from "./pages/CompletePage";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AdminOrder from "./pages/admin/AdminOrder";
import AdminUser from "./pages/admin/AdminUser";
import AdminCategory from "./pages/admin/AdminCategory";
import AdminProduct from "./pages/admin/AdminProduct";
import MyOrder from "./pages/user/MyOrder";
import { useAppSelector } from "./redux/hooks";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const App = () => {
  const { user } = useAppSelector((state) => state.auth);

  const Private = ({ children }: { children: React.ReactNode }) => {
    return user ? children : <Navigate to="/auth" />;
  };

  const Layout = () => {
    return (
      <div className="flex flex-col justify-between h-screen w-full">
        <Navbar />
        <div className="">
          <Outlet />
        </div>
        <Footer />
      </div>
    );
  };

  const AdminLayout = () => {
    return user?.role === "admin" ? (
      <div className="flex h-screen w-full">
        <AdminMenu />
        <div className="flex-8 flex flex-col overflow-y-auto">
          <AdminHeader />
          <Outlet />
        </div>
      </div>
    ) : (
      <Navigate to="/" />
    );
  };

  const UserLayout = () => {
    return (
      <div className="flex h-screen w-full flex-col">
        <UserHeader />
        <Outlet />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "*",
      element: <NotFound />,
    },

    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/foods",
          element: <Foods />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/foods/category",
          element: <Category />,
        },
        {
          path: "/foods/:id",
          element: <Product />,
        },
        {
          path: "/pay/:id",
          element: <Pay />,
        },

        {
          path: "/complete",
          element: (
            <Elements stripe={stripePromise}>
              <CompletePage />
            </Elements>
          ),
        },
      ],
    },
    {
      path: "/user",
      element: <UserLayout />,
      children: [
        {
          path: "/user",
          element: (
            <Private>
              <User />
            </Private>
          ),
        },
        {
          path: "orders/:id",
          element: (
            <Private>
              <MyOrder />
            </Private>
          ),
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin",
          element: (
            <Private>
              <Admin />
            </Private>
          ),
        },
        {
          path: "analytics",
          element: (
            <Private>
              <Analytics />
            </Private>
          ),
        },
        {
          path: "products",
          element: (
            <Private>
              <Products />
            </Private>
          ),
        },
        {
          path: "products/:id",
          element: (
            <Private>
              <AdminProduct />
            </Private>
          ),
        },
        {
          path: "orders",
          element: (
            <Private>
              <Orders />
            </Private>
          ),
        },
        {
          path: "orders/:id",
          element: (
            <Private>
              <AdminOrder />
            </Private>
          ),
        },
        {
          path: "users",
          element: (
            <Private>
              <Users />
            </Private>
          ),
        },
        {
          path: "users/:id",
          element: (
            <Private>
              <AdminUser />
            </Private>
          ),
        },
        {
          path: "categories",
          element: (
            <Private>
              <Categories />
            </Private>
          ),
        },
        {
          path: "categories/:id",
          element: (
            <Private>
              <AdminCategory />
            </Private>
          ),
        },
      ],
    },
  ]);
  return (
    <div
      className="h-screen w-screen text-[#333333] 
    bg-red-50
     overflow-y-auto overflow-x-hidden"
    >
      <Toaster className="9999999999" position="top-right" richColors />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
