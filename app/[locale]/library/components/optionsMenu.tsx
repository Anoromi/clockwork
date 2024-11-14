"use client";
import styles from "@/app/[locale]/library/components/optionsMenu.module.scss";
import CommonButton from "@/app/components/button/commonButton";
import RippleButton from "@/app/components/ripple-button";
import utilStyles from "@/app/styles/utils.module.scss";
import { useAppDispatch } from "@/app/utils/clientUseRedux";
import { Menu } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { changeAddDialog } from "../libraryStore";

type Props = {
  //locale: string
};

export default function OptionsMenu({}: Props) {
  const dispatch = useAppDispatch();
  return (
    <>
      <Menu as="div" className={styles.menuWrapper}>
        <Menu.Button className={utilStyles.contents}>
          <CommonButton buttonType={"blank"} textType={"icon"} as="div">
            <Icon icon="material-symbols:more-vert" fontSize={24} />
          </CommonButton>
        </Menu.Button>
        <Menu.Items className={styles.menuItems}>
          <Menu.Item>
            {({ active }) => (
              <RippleButton
                as="button"
                onClick={() => {
                  dispatch(changeAddDialog(true));
                }}
                className={styles.menuItem}
              >
                Add activity
              </RippleButton>
            )}
          </Menu.Item>
          {
            // <Menu.Item>
            //   {({ active }) => (
            //     <RippleButton
            //       as="button"
            //       onClick={() => {}}
            //       className={styles.menuItem}
            //     >
            //       Options
            //     </RippleButton>
            //   )}
            // </Menu.Item>
          }
        </Menu.Items>
      </Menu>
    </>
  );
}
