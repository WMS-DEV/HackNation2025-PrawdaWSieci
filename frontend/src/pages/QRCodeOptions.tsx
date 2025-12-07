import Navigation from "../components/Navigation";
import QRCodeOption from "../components/QRCodeOption";
import MObywatelLogo from "../assets/mObywatelLogo.svg?react";

export default function QRCodeOptions() {
  return (
    <div className="w-full h-screen p-3 flex flex-col justify-between ">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3 mb-6">
          <MObywatelLogo className="w-10 h-10" />
        </div>  
        <p className="font-extrabold text-3xl">Kod QR</p>
        <p className="font-medium text-md">
          Dzięki tej funckji zalogujesz się do usług w internecie i potwierdzisz
          cyfrowe dokumenty - zarówno swoje, jak i drugiej osoby 
        </p>
        <div className="flex flex-col gap-4">
          <QRCodeOption scanOrShow="scan" />
          <QRCodeOption scanOrShow="show" />
        </div>
      </div>
      <Navigation />
    </div>
  );
}
