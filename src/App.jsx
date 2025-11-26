import { useState } from "react";
import AppRoutes from "./routes/approutes";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

function App() {
  const [showApp, setShowApp] = useState(false);

  return (
    <>
      {showApp && <Navbar />}
      <AppRoutes setShowApp={setShowApp} showApp={showApp} />
      {showApp && <Footer />}
    </>
  );
}

export default App;