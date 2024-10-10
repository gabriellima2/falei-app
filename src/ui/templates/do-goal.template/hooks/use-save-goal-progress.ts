export function useSaveGoalProgress(goalId: string) {
	return {
		handleSaveGoalProgress: () => console.log(goalId),
	}
}
