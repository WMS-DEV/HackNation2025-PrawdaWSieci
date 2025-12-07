import { useNavigate } from "react-router-dom";
import RightArrowIcon from "../assets/RightArrowIcon.svg?react";

interface ServiceProps {
  text: string;
  icon: React.ReactNode;
  url?: string;
}

export default function Service({ text, icon, url }: ServiceProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (url) navigate(url);
  };

  return (
      <button
          onClick={handleClick}
          className="w-full h-20 rounded-2xl bg-[var(--primary-color)] p-2 transition flex gap-x-2 justify-start items-center shadow-md transition hover:bg-amber-800"
      >
          <div className="mx-3">{icon}</div>
          <div className="text-left">
              <p className="font-bold text-xl">{text}</p>
          </div>
          <div className="ml-auto mr-4">
              <RightArrowIcon className="w-2" />
          </div>
      </button>
  );
}
