import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useState, useEffect } from "react";
import BackIcon from "../assets/BackIcon.svg?react";

export default function ShowQR() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(150);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} min ${secs} sek.`;
  };

  return (
    <div className="w-full h-screen flex flex-col justify-between bg-[var(--background-color)]">
      <div className="flex items-center justify-between p-4 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#195598] font-bold text-lg"
        >
          <BackIcon className="w-5 h-5 mr-1" />
          Wróć
        </button>
        <h1 className="text-black font-bold text-lg">Kod QR</h1>
        <div className="w-16"></div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-black mb-2 leading-tight">
            Pokaż kod QR osobie, której dokument sprawdzasz
          </h2>
          <p className="text-gray-500 text-sm px-4">
            Gdy ta osoba zeskanuje lub przepisze kod, zobaczysz jej dane na swoim
            telefonie.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col items-center">
          <div className="w-64 h-64 bg-white mb-6">
            <img 
              src="/qr-code.png" 
              alt="QR Code" 
              className="w-full h-full object-contain"
            />
          </div>

          <p className="text-4xl font-bold text-black tracking-wider mb-8">
            234567
          </p>

          <div className="w-full h-1 bg-gray-100 rounded-full mb-4 overflow-hidden relative">
             <div 
                className="absolute left-0 top-0 h-full bg-[#195598] rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${(timeLeft / 150) * 100}%` }}
             ></div>
          </div>

          <p className="text-gray-500 text-sm font-medium">
            Kod wygaśnie za: <span className="text-black font-bold">{formatTime(timeLeft)}</span>
          </p>
        </div>
      </div>

      <Navigation />
    </div>
  );
}
