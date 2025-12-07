import { useNavigate } from "react-router-dom";
import BackIcon from "../assets/BackIcon.svg?react";

const ScanDone = (isSuccess: boolean) => {
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
                    Zweryfikowano kod QR
                </h1>
            </div>
            
            <main className="w-full max-w-md">
               {/* X ICON, header and short body text */}
               <XIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
               <h2 className="text-white font-bold text-2xl text-center mb-2">
                   Kod QR zweryfikowany pomyślnie!
                   </h2>
               <p className="text-white text-center mb-6">
                   Możesz teraz kontynuować korzystanie z usługi lub zeskanować
                   kolejny kod QR.
               </p>
            </main>
            {/* button column */}
            <div className="w-full max-w-md p-4 flex flex-col gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="w-full bg-[#195598] text-white font-bold py-3 rounded-lg"
                >
                    Zeskanuj ponownie
                </button>
                <button
                    onClick={() => navigate("/services")}
                    className="w-full bg-white text-[#195598] font-bold py-3 rounded-lg"
                >
                    Powrót do usług
                </button>
            </div>
        </div>
    );
};


export default ScanDone;