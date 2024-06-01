export const API_IP_PORT = "188.225.83.219:3000";
export const API_URL = `http://${API_IP_PORT}`;

export const getVariable = async () => {
    try {
        const response = await fetch(`${API_URL}/get-value`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching variable:", error);
    }
};

export const updateVariable = async (newVal: string) => {
    try {
        const response = await fetch(`${API_URL}/update-value`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ pass: 123, newVal }),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error updating variable:", error);
    }
};
