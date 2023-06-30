import { UserActivity } from "./data"
import { wait } from "./wait"

export async function getUserExercises(): Promise<UserActivity[]> {
	await wait(500)
	return [
		{
			name: "Sit up",
			type: "count-parameter",
		},
		{
			name: "Something",
			type: "weight+count-parameter",
		},
	]
}
