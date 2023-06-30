"use client"

import React, { Fragment, use, useState } from "react"
// import Select, { SelectProps } from "@mui/base/Select"
// import Option from "@mui/base/Option"
import { PERecordTypes, UserActivity } from "@/app/utils/data"
import { getUserExercises } from "@/app/utils/load"
import { Listbox, Transition } from "@headlessui/react"
import styles from "./selectActivity.module.scss"
import { useRipple } from "@/app/components/useRipple"
import classNames from "classnames"
import { useQuery } from "react-query"
// import utilStylesss from '../../../styles/utils.module.scss'
import utilStyles from "@/app/styles/utils.module.scss"
import { Icon } from "@iconify/react"
import { useReactive } from "@/app/components/useReactive"
import RippleButton from "@/app/components/ripple-button"
// import h from '@styles1/utils.module.scss'

type Props = {}

const people = [
	{ id: 1, name: "Durward Reynolds", unavailable: false },
	{ id: 2, name: "Kenton Towne", unavailable: false },
	{ id: 3, name: "Therese Wunsch", unavailable: false },
	{ id: 4, name: "Benedict Kessler", unavailable: true },
	{ id: 5, name: "Katelyn Rohan", unavailable: false },
]

export default function SelectActivity({}: Props) {
	const selectedActivity = useReactive<UserActivity | null>(null)
	// const ripple = useRipple()
	console.log("hello")
	const data = useQuery("select-activity", getUserExercises)

	return (
		<>
			{data.isLoading ? (
				<>Loading</>
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
												utilStyles.flex,
												utilStyles['justify-center'],
												utilStyles['align-center'],
												utilStyles['gap-y-2'],
												// utilStyles["inline-block"],

												{ [styles["button-selected"]]: h.open }
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

function ActivityOption({ data }: { data: UserActivity }) {
	return (
		<Listbox.Option value={data} className={classNames(utilStyles.contents)}>
			<RippleButton className={classNames(styles.option)} as="button">
				{data.name}
			</RippleButton>
		</Listbox.Option>
	)
}
