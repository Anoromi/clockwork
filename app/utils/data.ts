// type Weight = {

// }

// export type PERecords = {
//   parameterCount: number,
//   metrics: string[],
//   records: number[][]
// }

// export type PERecords =
// 	| {
// 			type: "weight+count-parameter"
// 			records: {
//         weight: number,
//         count: number
// 			}[]
// 	  }
// 	| {
// 			type: "count-parameter"
// 			records: {
// 				count: number
// 			}[]
// 	  }

// export type PERecordTypes =  PERecords['type']

//export type UserActivity = {
//	name: string
//	type: PERecordTypes
//}

// export type UserRepeatedTrial = {
// 	date: Date
// 	exercise: UserActivity
// 	trials: PERecords
// }
//
// export type UserRepeatedTrialAttempt = {
// 	exercise: UserActivity
// 	trials: PERecords
// }
