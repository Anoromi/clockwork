import { Dialog } from "@headlessui/react";
import styles from "./dialog.module.scss";

type Props = React.PropsWithChildren<{
  open: boolean;
  onClose: () => void;
}>;

const AppDialog = function AppDialog({ children, open, onClose }: Props) {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <div className={styles.dialogWrapper}>
          <Dialog.Panel className={styles.dialog}>
            <div className={styles.dialogBackground}></div>
            <div className={styles.dialogContent}>{children}</div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

const Title = function AppDialogTitle({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return <Dialog.Title className={className}>{children}</Dialog.Title>;
};

AppDialog.Title = Title;

export { AppDialog };
