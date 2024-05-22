import React, { useState, FormEvent } from "react";
import styles from "./page.module.css";
import Input from "./components/Input/input";

const API_KEY = "ab899246f13ec7b700d0fb7cab75d528";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.input}>
        <Input />
      </div>
    </main>
  );
}
