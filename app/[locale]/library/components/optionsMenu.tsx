"use client";
import styles from "@/app/[locale]/library/components/optionsMenu.module.scss";
import CommonButton from "@/app/components/button/commonButton";
import RippleButton from "@/app/components/ripple-button";
import { useAppDispatch } from "@/app/utils/clientUseRedux";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { changeAddDialog } from "../libraryStore";

type Props = {};

export default function OptionsMenu({}: Props) {
  const dispatch = useAppDispatch();
  return (
    <>
      <Menu as="div" className={styles.menuWrapper}>
        <MenuButton as={CommonButton} buttonType="blank" textType="icon">
          <Icon icon="material-symbols:more-vert" fontSize={24} />
        </MenuButton>
        {
          <MenuItems className={styles.menuItems}>
            <MenuItem>
              <RippleButton
                as="button"
                onClick={() => {
                  dispatch(changeAddDialog(true));
                }}
                className={styles.menuItem}
              >
                Add activity
              </RippleButton>
            </MenuItem>
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
          </MenuItems>
        }
      </Menu>
    </>
  );
}
