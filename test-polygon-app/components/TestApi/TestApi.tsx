// pages/index.tsx

import { getVariable, updateVariable } from "@/utils/api";
import { useState, useEffect } from "react";

const TestApi = () => {
    const [value, setValue] = useState<string>("");
    const [newValue, setNewValue] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            const result = await getVariable();
            setValue(result?.val || "No data");
        };
        fetchData();
    }, []);

    const handleUpdate = async () => {
        const result = await updateVariable(newValue);
        if (result?.success) {
            const updatedData = await getVariable();
            setValue(updatedData?.val || "No data");
        }
    };

    return (
        <div>
            <h1>Current Value: {value}</h1>
            <input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
            />
            <button onClick={handleUpdate}>Update Value</button>
        </div>
    );
};

export default TestApi;
