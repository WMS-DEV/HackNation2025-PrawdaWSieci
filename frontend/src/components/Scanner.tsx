import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { validateQrCode } from "../api/api";
import { useNavigate } from "react-router-dom";

type ValidationStatus =
    | "idle"
    | "scanning"
    | "validating"
    | "success"
    | "invalid"
    | "error";

const Scanner = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [status, setStatus] = useState<ValidationStatus>("scanning");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const navigate = useNavigate();
    const qrScannerRef = useRef<QrScanner | null>(null);

    useEffect(() => {
        if (!videoRef.current || status !== "scanning") {
            return;
        }

        const qrScanner = new QrScanner(
            videoRef.current,
            async (result) => {
                if (status === "scanning") {
                    setStatus("validating");
                    qrScanner.stop();

                    try {
                        console.log("Scanned QR:", result.data);
                        const isValid = await validateQrCode(result.data);

                        const newStatus =
                            isValid === "valid"
                                ? "success"
                                : isValid === "invalid"
                                ? "invalid"
                                : "error";

                        setStatus(newStatus);
                        // setStatus("invalid")
                    } catch (e) {
                        console.error("Validation failed", e);
                        setStatus("error");
                    }
                }
            },
            {
                returnDetailedScanResult: true,
                highlightScanRegion: true,
                highlightCodeOutline: true,
                preferredCamera: "environment",
            }
        );
        qrScannerRef.current = qrScanner;

        qrScanner.start().catch((err) => {
            console.error("Failed to start QR Scanner", err);
            let message = "Nie udało się uruchomić kamery.";
            if (typeof err === "string") {
                message = err;
            } else if (err instanceof Error) {
                message = err.message;
            }
            setErrorMsg(message);
        });

        return () => {
            qrScanner.stop();
            qrScanner.destroy();
        };
    }, [status]);

    const handleReset = () => {
        setStatus("scanning");
        setErrorMsg(null);
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 w-full">
            {status === "scanning" || status === "validating" ? (
                <>
                    {errorMsg ? (
                        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg max-w-sm w-full mb-4 text-center">
                            <p className="font-bold">Błąd kamery</p>
                            <p className="text-sm my-2">{errorMsg}</p>
                            <p className="text-xs text-gray-400">
                                Upewnij się, że strona ma uprawnienia do kamery
                                i (na telefonie) jest otwierana przez HTTPS.
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-3 px-4 py-2 bg-red-600 text-white rounded text-sm font-bold"
                            >
                                Odśwież stronę
                            </button>
                        </div>
                    ) : (
                        <div className="relative w-full max-w-sm aspect-square overflow-hidden rounded-lg shadow-lg bg-black">
                            <video
                                ref={videoRef}
                                className="w-full h-full object-cover"
                                muted
                                playsInline
                            />
                            {status === "validating" && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                                </div>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl flex flex-col items-center animate-in fade-in zoom-in duration-300">
                    {status === "success" ? (
                        <>
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <svg
                                    className="w-10 h-10 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Dane wiarygodne
                            </h3>
                            <p className="text-gray-600 text-center mb-6">
                                Weryfikacja zakończona pomyślnie. Dokument jest
                                poprawny.
                            </p>
                        </>
                    ) : status === "invalid" ? (
                        <>
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                <svg
                                    className="w-10 h-10 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Dokument nieprawidłowy
                            </h3>
                            <p className="text-gray-600 text-center mb-4">
                                Weryfikacja wykazała, że dokument jest
                                nieprawidłowy.
                            </p>
                            <p className="text-red-600 text-center font-semibold">
                                Uwaga, możesz być ofiarą oszustwa phishingowego.
                                Natychmiast opuść stronę, na której zeskanowano
                                kod.
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                <svg
                                    className="w-10 h-10 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Błąd weryfikacji
                            </h3>
                            <p className="text-gray-600 text-center mb-6">
                                Nie udało się potwierdzić ważności dokumentu lub
                                wystąpił błąd.
                            </p>
                        </>
                    )}

                    <button
                        onClick={handleReset}
                        className="w-full py-3 px-4 bg-[#195598] hover:bg-[#15467e] text-white font-bold rounded-lg transition-colors"
                    >
                        Skanuj ponownie
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="mt-3 w-full py-3 px-4 bg-transparent text-gray-600 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Wróć do pulpitu
                    </button>
                </div>
            )}
        </div>
    );
};

export default Scanner;
