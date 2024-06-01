"use client";

import { useTheme } from "@/hooks/use-theme";
import styles from "./page.module.scss";
import { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../i18n";
import MyEditor from "@/components/MyEditor/MyEditor";
import FlowEditor from "@/components/FlowEditor/FlowEditor";
import DragAndDropList from "@/components/DndList/DndList";
import Dialog from "@/components/Dialogs/Dialog";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_URL } from "@/utils/api";
import WorkWithAudio from "@/components/WorkWithFile/workWithAudio";
import WorkWithAvatar from "@/components/WorkWithFile/workWithAcatar";

type localesID = "en" | "ru";

const locales: {
  en: { title: string },
  ru: { title: string },
} = {
  en: { title: "English" },
  ru: { title: "Русский" }
};

function HomeLocal() {
  const { setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      axios.get(`${API_URL}/api/auth/user`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(response => {
        setUsername(response.data.user.name);
      }).catch(() => {
        router.push("/login");
      });
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <main className={styles.main}>
      <h1>Welcome, {username}</h1>
      <button onClick={handleLogout}>Log out</button>
      <WorkWithAudio />
      <WorkWithAvatar />
      {/* <ButtonChangeColor /> */}
      <div>{t("main.header")}</div>
      <button onClick={() => setTheme("light")}>Set light</button>
      <button onClick={() => setTheme("dark")}>Set dark</button>
      <ul>
        {Object.keys(locales).map(l => (
          <li key={l}>
            <button onClick={() => i18n.changeLanguage(l)}>
              {locales[l as localesID].title}
            </button>
          </li>
        ))}
      </ul>
      <FlowEditor />
      <MyEditor />
      <div>
        <h1>Диалоги</h1>
        <Dialog />
      </div>
      <div style={{ padding: "20px" }}>
        <h1>Drag and Drop List</h1>
        <DragAndDropList />
      </div>
    </main>
  );
}

export default function Home() {
  return <Suspense fallback="...loading">
    <HomeLocal />
  </Suspense>;
}