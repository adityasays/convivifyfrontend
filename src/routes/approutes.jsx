// routes/approutes.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AppLayout from "../layout/AppLayout";
import BookTherapist from "../pages/book/book";
import Home from "../pages/home/home";
import AboutUs1 from "../pages/about/about";
import Contact from "../pages/contact/contact";
import Consult from "../pages/consult/consult";
import Chatbot from "../pages/chatbot/chatbot";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Assessment from "../pages/assessment/assessment";

const AppRoutes = ({ setShowApp, showApp }) => {
  const location = useLocation();

  // Auto-show Navbar/Footer on all pages except during Home preloader
  useEffect(() => {
    if (showApp || location.pathname !== "/") {
      setShowApp(true);
    }
  }, [location.pathname, showApp, setShowApp]);

  const isHomePreloader = location.pathname === "/" && !showApp;

  return (
    <AppLayout hideNavFooter={isHomePreloader}>
      <Routes>
        <Route path="/" element={<Home setShowApp={setShowApp} />} />
        <Route path="/about" element={<AboutUs1 />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/consult" element={<Consult />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/book" element={<BookTherapist />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/login" element={<Login setShowApp={setShowApp} />} />
        <Route path="/register" element={<Register setShowApp={setShowApp} />} />
      </Routes>
    </AppLayout>
  );
};

export default AppRoutes;