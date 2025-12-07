const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const validateQrCode = async (
    validationId: string
): Promise<boolean> => {
    try {
        const response = await fetch(
            `${API_URL}/api/v1/validation/${validationId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status === 200) {
            return true;
        }
        return false;
    } catch (error) {
        console.error("Validation error:", error);
        return false;
    }
};

export type DomainItem = { id: number; domain: string };

export const getDomainList = async (): Promise<DomainItem[]> => {
    try {
        const response = await fetch(`${API_URL}/domains`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const data: DomainItem[] = await response.json();
            return Array.isArray(data) ? data : [];
        } else {
            console.error("Failed to fetch domains:", response.statusText);
            return [];
        }
    } catch (error) {
        console.error("Error fetching domains:", error);
        return [];
    }
};
