"use client";

import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Fragment, ReactNode, useMemo, useRef } from "react";
import styles from "./dialog.module.scss";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

const AppDialog = function AppDialog({ children, open, onClose }: Props) {
  const currentElement = useRef<React.ReactNode | null>(null);

  const attempt = useMemo(() => {
    if (!open) return currentElement.current;

    currentElement.current = children;

    return currentElement.current;
  }, [open, children]);

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog onClose={onClose} as="div" className={styles.mainDialog}>
          
            <Transition.Child
                as={Fragment}
                enter={styles.opacityEnter}
                enterFrom={styles.opacityEnterFrom}
                enterTo={styles.opacityEnterTo}
                leave={styles.opacityLeave}
                leaveFrom={styles.opacityLeaveFrom}
                leaveTo={styles.opacityLeaveTo}
            >
              <div className={styles.dialogBackground}></div>
            </Transition.Child>
            <div className={styles.dialogWrapper}>
              <Transition.Child
                as={Fragment}
                enter={styles.popupEnter}
                enterFrom={styles.popupEnterFrom}
                enterTo={styles.popupEnterTo}
                leave={styles.popupLeave}
                leaveFrom={styles.popupLeaveFrom}
                leaveTo={styles.popupLeaveTo}
              >
                <Dialog.Panel className={styles.dialog}>
                  <div className={styles.dialogContent}>{attempt}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
        </Dialog>
      </Transition>
    </>
  );
};

const Title = function AppDialogTitle({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <Dialog.Title className={classNames(styles.title, className)}>
      {children}
    </Dialog.Title>
  );
};

AppDialog.Title = Title;

export { AppDialog };
