import { useCallback } from 'react'
import type { ListRenderItemInfo } from 'react-native'

import { BreathingExercise } from '@/ui/components/breathing-exercise'
import { HorizontalList } from '@/ui/components/horizontal-list'
import { EmptyMessage } from '@/ui/atoms/empty-message'
import { Skeleton } from '@/ui/atoms/skeleton'

import { useGetAllBreathingExercises } from '@/hooks/queries/use-get-all-breathing-exercises'
import { useBreathingExercisesContext } from '../contexts/breathing-exercises.context/hooks'
import { useNavigation } from '@/hooks/use-navigation'

import { ROUTES } from '@/constants/routes'
import type { BreathingExerciseEntity } from '@/entities/breathing-exercise.entity'

export function BreathingExercisesContainer() {
	const navigation = useNavigation()
	const { handleOpenBreathingExerciseMenu } = useBreathingExercisesContext()
	const { breathingExercises, isLoading, isFetching } =
		useGetAllBreathingExercises()

	const handleDoBreathingExercise = useCallback(
		(id: string) => {
			navigation.push(ROUTES.APP.DO_BREATHING_EXERCISE(id))
		},
		[navigation],
	)

	const keyExtractor = useCallback(
		(item: BreathingExerciseEntity) => item.id,
		[],
	)

	const renderItem = useCallback(
		({ item }: ListRenderItemInfo<BreathingExerciseEntity>) => (
			<BreathingExercise
				id={item.id}
				title={item.title}
				steps={item.steps}
				roundsTotal={item.roundsTotal}
				onPress={handleDoBreathingExercise}
				onMenuPress={handleOpenBreathingExerciseMenu}
			/>
		),
		[handleDoBreathingExercise, handleOpenBreathingExerciseMenu],
	)

	return (
		<HorizontalList
			data={breathingExercises}
			renderItem={renderItem}
			keyExtractor={keyExtractor}
			ListEmptyComponent={() => (
				<>
					{isLoading || isFetching ? (
						<Skeleton.ExerciseList />
					) : (
						<EmptyMessage />
					)}
				</>
			)}
		/>
	)
}
