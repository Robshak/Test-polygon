"use client";

import { useTheme } from "@/hooks/use-theme";
import styles from "./page.module.scss";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import "../i18n";
import MyEditor from "@/components/MyEditor/MyEditor";
import FlowEditor from "@/components/FlowEditor/FlowEditor";
import DragAndDropList from "@/components/DndList/DndList";

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

  return (
    <main className={styles.main}>
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