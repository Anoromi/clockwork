import Link from "next/link";
import CommonButton from "../components/button/commonButton";
import { useRipple } from "../components/useRipple";
import styles from "./page.module.scss";
import { BeginButton } from "./components/beginButton";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Clockwork</h1>
      <h2>Record, time, overview</h2>
      <BeginButton>Begin</BeginButton>
    </main>
  );
}
