import Scanner from "../components/Scanner";
import { useNavigate } from "react-router-dom";
import BackIcon from "../assets/BackIcon.svg?react";


const ScanQR = () => {
  const navigate = useNavigate();

  return (
      <div className="min-h-screen bg-[#101317] flex flex-col items-center pt-8">
          <div className="w-full flex items-start justify-start p-4 pt-8">
              <button
                  onClick={() => navigate(-1)}
                  className="flex items-center text-[#195598] font-bold text-lg"
              >
                  <BackIcon className="w-5 h-5 mr-1" />
                  Wróć
              </button>
              <h1 className="mx-auto text-white font-bold text-lg">
                  Zeskanuj kod QR
              </h1>
          </div>
          <p className="text-white">
              {" "}
              Umieść kod QR w ramce, aby go zeskanować.
          </p>
          <main className="w-full max-w-md">
              <Scanner />
          </main>
      </div>
  );
};

export default ScanQR;
