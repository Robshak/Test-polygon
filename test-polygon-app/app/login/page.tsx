"use client";

import { useState } from "react";
import axios from "axios";
import styles from "./Login.module.scss";
import { useRouter } from "next/navigation";
import { API_URL } from "@/utils/api";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, {
                name: username,
                password
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.userId);
            router.push("/");
        } catch (error) {
            alert("Invalid credentials");
        }
    };

    return (
        <div className={styles.container}>
            <h1>Log in</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
