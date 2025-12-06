import ScanQRIcon from "../assets/ScanQRIcon.svg?react";
import ShowQRIcon from "../assets/ShowQRIcon.svg?react";
import RightArrowIcon from "../assets/RightArrowIcon.svg?react";

interface QRCodeOptionProps {
  scanOrShow: "scan" | "show";
}

export default function QRCodeOption({ scanOrShow }: QRCodeOptionProps) {
  return (
    <button className="w-full h-20 rounded-2xl bg-[var(--primary-color)] p-2 transition flex gap-x-2 justify-around items-center shadow-md transition hover:bg-amber-800">
      <div>
        {scanOrShow === "scan" ? (
          <ScanQRIcon className="w-10" />
        ) : (
          <ShowQRIcon className="w-10" />
        )}
      </div>
      <div className="text-left">
        <p className="font-bold text-xl">
          {scanOrShow === "scan" ? "Zeskanuj" : "Pokaż"} kod QR
        </p>
        <p className="">Zaloguj się lub potwierdź swoje dane</p>
      </div>
      <div>
        <RightArrowIcon className="w-5" />
      </div>
    </button>
  );
}
