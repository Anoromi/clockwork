import styles from "./dialog.module.scss";

type Props = React.PropsWithChildren<{}>;

export default function Dialog({ children }: Props) {
  return (
    <>
      <div className={styles.dialogWrapper}>
        <div className={styles.dialog}>{children}</div>
      </div>
    </>
  );
}
