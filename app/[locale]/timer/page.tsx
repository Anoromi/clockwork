"use client"

import React, { Suspense, useState } from "react"
import styles from "./styles.module.scss"
import RippleButton from "../../components/ripple-button"
import Inh from "./inh"
import { clockFont, rubik } from "../../styles/fonts"
import classNames from "classnames"
import { useTranslations } from "next-intl"
import { Icon } from "@iconify/react"
import Link from "next/link"
import evStyles from "./current-event.module.scss"
import { AppDispatch, RootState, store } from "@/app/store"
import { increment, start } from "./timerStore"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import Timer from "./component/timer"
import dayjs from "dayjs"
import SelectActivity from "./component/selectActivity"

function useTypedTranslations() {}

type CurrentEventsProps = {
	index: number
}

function CurrentEvent({ index }: CurrentEventsProps) {
	return (
		<div className={classNames(styles.card)}>
			<h5 className={styles.index}>{index}</h5>
			<div className={styles.info}>
				<div className={styles.text}>20</div>
				<div className={styles.text}>70kg</div>
			</div>
		</div>
	)
}

const useAppDispatch: () => AppDispatch = useDispatch
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default function TimerPage() {
	// useStore()
	const [pos, setpos] = useState(0)
	const t = useTranslations("Timer")
	const state = useAppSelector((state) => state.timer)
	const dispatch = useAppDispatch()

	return (
		<>
			<main className={classNames(rubik.className, styles.main)}>
				<div className={classNames(styles.container)}>
					<div className={classNames(styles["top-bar"])}>
						<div className={classNames(styles.summary)}>
							<div>52 Overall</div>
							<div>
								{t("attempt", {
									value: 3,
								})}
							</div>
							{/* <button onClick={() => dis(increment())}>{inc}</button> */}
						</div>

						<section className={styles["event-list"]}>
							{Array(5)
								.fill(0)
								.map((_, i) => (
									<CurrentEvent index={i + 1} key={i} />
								))}
						</section>
					</div>
					<div className={styles["clock-wrapper"]}>
						{state.currentTimer !== null ? (
							<>
								<Timer
									className={classNames(
										styles["clock-current"],
										clockFont.className
									)}
									initial={state.currentTimer?.currentRecordTimestamp}
								/>
								<div className={styles["clock-overall"]}>12:00</div>
							</>
						) : (
							<>
									<SelectActivity />

							</>
						)}
					</div>
					<div className={classNames(styles["main-actions"], styles.test)}>
						<RippleButton className={styles["record-button"]}>
							<Icon icon="mdi:record" fontSize={36} />
							Record
						</RippleButton>
						<div className={styles["secondary-actions"]}>
							{state.currentTimer !== null ? (
								<>
									<RippleButton className={styles["secondary-button"]}
										key="pause"
									>
										<Icon icon="material-symbols:pause" fontSize={24} />
										Pause
									</RippleButton>
									<RippleButton className={styles["secondary-button"]}
										key="stop"
									>
										<Icon icon="material-symbols:stop" fontSize={24} />
										Stop
									</RippleButton>
								</>
							) : (
								<>
									<RippleButton
										className={styles.start}
										onClick={() => {
											dispatch(start())
										}}
										key="start"
									>
										<Icon icon="mingcute:play-fill" fontSize={30} />
										Start
									</RippleButton>
								</>
							)}
						</div>
					</div>
				</div>
			</main>
		</>
	)
}
