"use client"

import React, {Fragment, use, useState} from "react"
// import Select, { SelectProps } from "@mui/base/Select"
// import Option from "@mui/base/Option"
import {getUserExercises} from "@/app/utils/load"
import {Listbox, Transition} from "@headlessui/react"
import styles from "@/app/[locale]/timer/component/selectActivity.module.scss"

import {useRipple} from "@/app/components/useRipple"
import classNames from "classnames"
import {useQuery} from "react-query"
import utilStyles from "@/app/styles/utils.module.scss"
import jenny from "@/app/styles/utils.module.scss"
import {Icon} from "@iconify/react"
import {useReactive} from "@/app/components/useReactive"
import RippleButton from "@/app/components/ripple-button"
import {IActivity} from "@/app/backend/database"
// import h from '@styles1/utils.module.scss'

type Props = {}

export default function SelectActivity({}: Props) {
  const selectedActivity = useReactive<IActivity | null>(null)
  // const ripple = useRipple()
  console.log("hello")
  const data = useQuery("select-activity", getUserExercises)
  
  
  
  
  
  



  
  

  return (
    <>
      {data.isLoading ? (
        <></>
      ) : (
        <>
          <span className={classNames(styles.listbox)}>
            <Listbox value={null} onChange={selectedActivity.set}>
              <Listbox.Button className={classNames(utilStyles.contents)}>
                {(h) => (
                  <>
                    <RippleButton
                      // {...ripple.buttonData}
                      className={classNames(
                        // ripple.buttonData.className,
                        styles.button,
                        utilStyles['justify-center'],
                        utilStyles['align-center'],
                        utilStyles['gap-y-2'],
                        // utilStyles["inline-block"],

                        {[styles["button-selected"]]: h.open}
                      )}
                      as="div"
                    >
                      {selectedActivity.value?.name ?? "Select activity"}
                      <Icon
                        icon="material-symbols:expand-more"
                        fontSize={30}
                      />
                    </RippleButton>
                  </>
                )}
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave={styles['opacity-leave']}
                enter={styles['opacity-enter']}
                enterTo={styles['opacity-enter-to']}
                enterFrom={styles['opacity-enter-from']}
                leaveTo={styles['opacity-leave-to']}
                leaveFrom={styles['opacity-leave-from']}
              >
                <Listbox.Options
                  className={classNames(styles.options)}
                  hidden={false}
                >
                  {data.data!.map((activity) => (
                    <ActivityOption data={activity} key={activity.name} />
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </span>
        </>
      )}
    </>
  )
}

function ActivityOption({data}: {data: IActivity}) {
  return (
    <Listbox.Option value={data} className={classNames(utilStyles.contents)}>
      <RippleButton className={classNames(styles.option)} as="div">
        {data.name}
      </RippleButton>
    </Listbox.Option>
  )
}
