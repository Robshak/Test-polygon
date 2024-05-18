import { useLayoutEffect, useState } from "react";

export type themeType = "light" | "dark";
const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
const defaultTheme: themeType = isDarkTheme ? "dark" : "light";

export const useTheme = () => {
    const [theme, setTheme] = useState<themeType>(
        localStorage.getItem("app-theme") as themeType ?? defaultTheme);

    useLayoutEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("app-theme", theme);
    }, [theme]);

    return { theme, setTheme };
};