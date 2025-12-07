import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MObywatelLogo from "../assets/mObywatelLogo.svg?react";
import EyeIcon from "../assets/EyeIcon.svg?react";
import EyeSlashIcon from "../assets/EyeSlashIcon.svg?react";

export default function Login() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="w-full h-screen flex flex-col p-6 pt-16 bg-[#F2F5F9]">
      <div className="flex items-center gap-3 mb-6">
        <MObywatelLogo className="w-10 h-10" />
        <span className="font-bold text-3xl text-black">mObywatel</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-black mb-2">
          Dzień dobry!
        </h1>
        <p className="text-gray-500 font-medium">Zaloguj się do aplikacji.</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col relative">
            <label
              className="text-xs font-semibold text-gray-500 mb-1 ml-1"
              htmlFor="password"
            >
              Hasło
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 pr-10 text-lg focus:outline-none focus:border-[var(--secondary-color)] focus:ring-1 focus:ring-[var(--secondary-color)]"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-6 h-6" />
                ) : (
                  <EyeIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          <button
            type="button"
            className="text-[var(--secondary-color)] font-bold text-sm text-left px-1"
          >
            Nie pamiętasz hasła?
          </button>
        </form>
      </div>
    </div>
  );
}
