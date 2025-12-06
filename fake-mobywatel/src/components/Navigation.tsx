import HomeIcon from "../assets/HomeIcon.svg?react";
import DocsIcon from "../assets/DocsIcon.svg?react";
import ServicesIcon from "../assets/ServicesIcon.svg?react";
import QRIcon from "../assets/QRIcon.svg?react";
import MoreIcon from "../assets/MoreIcon.svg?react";

export default function Navigation() {
  return (
    <div className="flex justify-around">
      <div className="flex flex-col justify-center items-center">
        <HomeIcon className="h-8" />
        <p className="text-md">Pulpit</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <DocsIcon className="h-8" />
        <p className="text-md">Dokumenty</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <ServicesIcon className="h-8" />
        <p className="text-md">Usługi</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <QRIcon className="h-8" />
        <p className="text-md">kod QR</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <MoreIcon className="h-8" />
        <p className="text-md">Więcej</p>
      </div>
    </div>
  );
}
