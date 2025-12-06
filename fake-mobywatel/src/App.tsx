import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QRCodeOptions from "./pages/QRCodeOptions";

function App() {
  return (
    <div className="bg-[var(--background-color)] w-full h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<QRCodeOptions />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
