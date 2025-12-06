import { useState, useCallback } from "react";

interface UsePostStringResult {
  sendString: (data: string) => Promise<boolean>;
  loading: boolean;
  error: Error | null;
}

const usePostString = (path: string): UsePostStringResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const sendString = useCallback(
    async (data: string): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        const apiPort = import.meta.env.SERVICE_PORT || "8080";
        const url = `http://localhost:${apiPort}${path}`;

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to send string");
        }

        setLoading(false);
        return true;
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred"));
        }
        setLoading(false);
        return false;
      }
    },
    [path]
  );

  return { sendString, loading, error };
};

export default usePostString;
