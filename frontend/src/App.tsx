import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import QRCodeOptions from "./pages/QRCodeOptions";
import Home from "./pages/Home";
import ShowQR from "./pages/ShowQR";
import ScanQR from "./pages/ScanQR";
import Services from "./pages/Services";
import Domains from "./pages/Domains";
// import ScanDone from "./pages/ScanDone";

function App() {
  return (
      <div className="bg-[var(--background-color)] w-full h-screen overflow-hidden">
          <Router>
              <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/options" element={<QRCodeOptions />} />
                  <Route path="/show-qr" element={<ShowQR />} />
                  <Route path="/scan-qr" element={<ScanQR />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/domains" element={<Domains />} />
                  {/* <Route path="/scan-done" element={<ScanDone />} /> */}
              </Routes>
          </Router>
      </div>
  );
}

export default App;
