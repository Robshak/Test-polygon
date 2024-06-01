"use client";

import React, { useEffect, useState } from "react";
import styles from "./ButtonChangeColor.module.scss";
import { API_IP_PORT } from "@/utils/api";

const ButtonChangeColor = () => {
    const [color, setColor] = useState("blue");
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const socket = new WebSocket(`ws://${API_IP_PORT}`);
        setWs(socket);

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "color") {
                setColor(data.color);
            } else if (data.type === "error") {
                setErrorMessage(data.message);
                setTimeout(() => setErrorMessage(null), 3000);
            }
        };

        return () => {
            socket.close();
        };
    }, []);

    const toggleColor = () => {
        if (ws) {
            ws.send(JSON.stringify({ type: "toggleColor" }));
        }
    };

    return (
        <div>
            <button
                className={`${styles.button} ${color === "blue" ? styles.blue : styles.red}`}
                onClick={toggleColor}
            >
                Click me to change color
            </button>
            {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        </div>
    );
};

export default ButtonChangeColor;
