// import { BrowserRouter, useRoutes } from "react-router-dom";
// import routes from "./routes/index";
// import { DashboardProvider } from "./context/DashboardContext";
// import { PendingCounterProvider } from "./context/pending-counter";
// import { ListingsProvider } from "./context/ListingsContext";

// function AppRoutes() {
//   return useRoutes(routes);
// }

// export default function App() {
//   return (
//     <ListingsProvider>
//       <DashboardProvider>
//         <PendingCounterProvider>
//           <BrowserRouter>
//             <AppRoutes />
//           </BrowserRouter>
//         </PendingCounterProvider>
//       </DashboardProvider>
//     </ListingsProvider>
//   );
// }



import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "../src/context/auth-context.tsx";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Listings from "./pages/Listings.jsx";
import Contact from "./pages/Contact.jsx";
import Blog from "./pages/Blog.jsx";
import ListingDetails from "./pages/ListingDetail";
import BlogDetail from "./pages/BlogDetail";
import MoveUpBtn from "./components/UI/MoveUpBtn.jsx";
import NotFound from "./pages/NotFound";
import DashBoard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateListing from "./components/Dashboard/CreateListing";
import CreateUser from "./components/Dashboard/CreateUser";
import DashboardListing from "./components/Dashboard/DashboardListing";
import { DashboardProvider } from "./context/DashboardContext";
import { PendingCounterProvider } from "./context/pending-counter";
import LoginForm from "./components/UI/LoginForm";
import RegisterForm from "./components/UI/RegisterForm";

import ListingComapanyDetails from "./pages/ListingCompanyDetails";
import { ListingsProvider, useListings } from "./context/ListingsContext.js";

const MainLayout = () => (
  <>
    <Navbar />
    <ScrollToTop />
    <Outlet />
    <Footer />
    <MoveUpBtn />
  </>
);

const NotFoundLayout = () => (
  <>
    <ScrollToTop />
    <NotFound />
    <MoveUpBtn />
  </>
);

const App = () => {

  

  return (
    <AuthProvider>
      <ListingsProvider>
        <DashboardProvider>
          <PendingCounterProvider>
            <AppRoutes />
          </PendingCounterProvider>
        </DashboardProvider>
      </ListingsProvider>
    </AuthProvider>
  );
};

const AppRoutes = () => {

  const { fetchListings } = useListings();

  useEffect(() => {
    fetchListings();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <LoginForm />,
        },
        {
          path: "/signup",
          element: <RegisterForm />,
        },
        {
          path: "/about-us",
          element: <About />,
        },
        {
          path: "/listings",
          element: <Listings />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/blog",
          element: <Blog />,
        },
        {
          path: "/business/:slug",
          element: <ListingComapanyDetails />,
        },
        {
          path: "/listings/:pid",
          element: <ListingDetails />,
        },
        {
          path: "/blogdetail/:id",
          element: <BlogDetail />,
        },
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute>
              {/* <PendingCounterProvider> */}
                {/* <DashboardProvider> */}
                  <DashBoard />
                {/* </DashboardProvider> */}
              {/* </PendingCounterProvider> */}
            </ProtectedRoute>
          ),
          children: [
            {
              path: "createuser",
              element: <CreateUser />,
            },
            {
              path: "createlisting",
              element: <CreateListing />,
            },
            {
              path: "listings",
              element: <DashboardListing />,
            },
            {
              path: "*",
              element: <NotFound />,
            },
          ],
        },
        {
          path: "*",
          element: <NotFoundLayout />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
