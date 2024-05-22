import React from "react";
import styles from "./page.module.css";
import Input from "./components/WeatherComponent/WeatherComponent";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.input}>
        <Input />
      </div>
    </main>
  );
}
