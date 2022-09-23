import React from "react";
import styles from "./Header.module.css";
import { PlusCircle, Rocket } from "phosphor-react";

export function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.title}>
        <Rocket size={24} />
        <strong>Todo</strong>
      </div>
    </header>
  );
}
