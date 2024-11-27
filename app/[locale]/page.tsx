import { BeginButton } from "./components/beginButton";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Clockwork</h1>
      <h2>Record, time, review</h2>
      <BeginButton>Begin</BeginButton>
    </main>
  );
}
