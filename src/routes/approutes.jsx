import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/home";
import AboutUs1 from "../pages/about/about";
import Contact from "../pages/contact/contact";
import Consult from "../pages/consult/consult";
import Assessment from "../pages/assessment/assessment";

const AppRoutes = ({ setShowApp, showApp }) => {
  return (
    <Routes>
      <Route path="/" element={<Home setShowApp={setShowApp} />} />
      <Route path="/about" element={<AboutUs1 />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/consult" element={<Consult />} />
      <Route path="/assessment" element={<Assessment />} />
    </Routes>
  );
};

export default AppRoutes;