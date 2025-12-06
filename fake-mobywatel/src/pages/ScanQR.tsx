import Scanner from "../components/Scanner";
import { Link } from "react-router-dom";

const ScanQR = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center pt-8">
      <header className="w-full max-w-md px-4 mb-4 flex items-center">
        <Link to="/dashboard" className="text-blue-400 hover:text-blue-300">
          &larr; Back to Dashboard
        </Link>
      </header>
      <main className="w-full max-w-md">
        <Scanner />
      </main>
    </div>
  );
};

export default ScanQR;
