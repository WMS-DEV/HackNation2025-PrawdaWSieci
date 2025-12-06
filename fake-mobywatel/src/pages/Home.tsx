import React from "react";
import Navigation from "../components/Navigation";
import MObywatelLogo from "../assets/mObywatelLogo.svg?react";
import DocumentCard from "../components/DocumentCard";

const Home: React.FC = () => {
  return (
    <div className="w-full h-screen bg-[var(--background-color)] flex flex-col overflow-hidden relative">
      <header className="px-5 pt-4 pb-2 flex justify-between items-center bg-[var(--background-color)] sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <MObywatelLogo className="w-8 h-8 text-red-600" />
        </div>
        <div>
          <div className="w-6 h-6 rounded-fullflex items-center justify-center">
            <span className="text-xl">🔔</span>
          </div>
        </div>
      </header>
      <div className="px-5 pb-2">
        <h1 className="text-3xl font-bold text-black mb-1">Dokumenty</h1>
        <div className="flex justify-end gap-4 text-blue-600 font-medium text-sm">
          <button>Dostosuj</button>
          <button>Dodaj</button>
        </div>
      </div>
      <main className="flex-1 overflow-y-auto px-5 pb-24 space-y-[-110px] pt-4">
        <DocumentCard
          title="mDowód"
          colorClass="bg-gradient-to-br from-[#007AFF] to-[#0055c4]"
          heightClass="h-56"
          zIndexClass="z-10"
        />

        <DocumentCard
          title="Legitymacja emeryta-rencisty"
          colorClass="bg-gradient-to-br from-[#009b7c] to-[#007a61]"
          heightClass="h-56"
          zIndexClass="z-20"
          icon={<div className="font-bold text-lg">ZUS</div>}
        />

        <DocumentCard
          title="Karta Dużej Rodziny"
          colorClass="bg-gradient-to-br from-[#6236b2] to-[#4a2885]"
          heightClass="h-56"
          zIndexClass="z-30"
          icon={<div className="font-bold text-lg">👨‍👩‍👧‍👦</div>}
        />

        <DocumentCard
          title="Moje pojazdy"
          colorClass="bg-gradient-to-br from-[#e88b30] to-[#c66a15]"
          heightClass="h-56"
          zIndexClass="z-40"
        />

        <div className="h-32 w-full"></div>
      </main>
      <div className="p-3">
        <Navigation />
      </div>
    </div>
  );
};

export default Home;
