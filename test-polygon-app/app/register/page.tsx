"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./Register.module.scss";
import { API_URL } from "@/utils/api";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/auth/register`, {
                name: username,
                email,
                password
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.userId);
            router.push("/");
        } catch (error) {
            alert("Username already exists");
        }
    };

    return (
        <div className={styles.container}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
