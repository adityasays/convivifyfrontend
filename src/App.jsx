// App.jsx
import { useState } from "react";
import AppRoutes from "./routes/approutes";

function App() {
  const [showApp, setShowApp] = useState(false);

  return (
    <AppRoutes setShowApp={setShowApp} showApp={showApp} />
  );
}

export default App;