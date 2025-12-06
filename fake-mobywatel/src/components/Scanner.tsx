import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";

const Scanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scannedResult, setScannedResult] = useState<string | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const qrScanner = new QrScanner(
      videoRef.current,
      (result) => {
        console.log("Decoded QR code:", result);
        setScannedResult(result.data);
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );

    qrScanner.start();

    return () => {
      qrScanner.stop();
      qrScanner.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold mb-4 text-white">QR Code Scanner</h2>
      <div className="relative w-full max-w-sm aspect-square overflow-hidden rounded-lg shadow-lg border-2 border-slate-700">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
        />
      </div>
      {scannedResult && (
        <div className="mt-4 p-4 bg-slate-800 rounded-lg text-white w-full max-w-sm">
          <p className="text-sm text-gray-400">Last Scanned Result:</p>
          <p className="font-mono break-all">{scannedResult}</p>
        </div>
      )}
    </div>
  );
};

export default Scanner;
