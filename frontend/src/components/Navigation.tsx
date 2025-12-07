import DocsIcon from "../assets/DocsIcon.svg?react";
import ServicesIcon from "../assets/ServicesIcon.svg?react";
import QRIcon from "../assets/QRIcon.svg?react";
import MoreIcon from "../assets/MoreIcon.svg?react";

import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const navigate = useNavigate();

  return (
    <div className="bg-[var(--background-color)] left-0 pt-3 absolute bottom-0 w-full flex justify-around">
      <div
        className="flex flex-col justify-center items-center"
        onClick={() => navigate("/")}
      >
        <DocsIcon className="h-6" />
        <p className="text-md">Dokumenty</p>
      </div>
      <div className="flex flex-col justify-center items-center" onClick={() => navigate("/services")}>
        <ServicesIcon className="h-6" />
        <p className="text-md">Usługi</p>
      </div>
      <div
        className="flex flex-col justify-center items-center cursor-pointer"
        onClick={() => navigate("/options")}
      >
        <QRIcon className="h-6" />
        <p className="text-md">kod QR</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <MoreIcon className="h-6" />
        <p className="text-md">Więcej</p>
      </div>
    </div>
  );
}
