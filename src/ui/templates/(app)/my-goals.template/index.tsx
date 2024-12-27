import { FlatList, View } from 'react-native'
import { Flame, GoalIcon } from 'lucide-react-native'

import { GoBackButton } from '@/ui/atoms/buttons/go-back-button'
import { Typography } from '@/ui/atoms/typography'
import { Header } from '@/ui/components/header'

import { useGetAllGoals } from '@/hooks/queries/use-get-all-goals'

export function MyGoals() {
	const { goals } = useGetAllGoals()
	return (
		<FlatList
			data={goals}
			contentContainerStyle={{ paddingHorizontal: 16 }}
			ItemSeparatorComponent={() => <View className="h-4" />}
			ListHeaderComponent={() => (
				<Header.Root className="justify-start">
					<GoBackButton />
					<Header.Title className="ml-4">Minhas metas</Header.Title>
				</Header.Root>
			)}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => {
				const percentage = Math.min(
					(item.currentWeekProgress / item.roundsTotal) * 100,
					100,
				)
				return (
					<View
						key={item.id}
						className="bg-base-primary-foreground p-4 rounded-xl flex-row items-center"
					>
						<View className="w-16 h-16 mr-4 rounded-full bg-base-primary-foreground items-center justify-center">
							<Flame className="text-base-primary" />
						</View>
						<View className="flex-1">
							<Typography.Title className="mb-2">{item.title}</Typography.Title>
							<View className="flex-row items-center gap-1 mb-4">
								<GoalIcon size={16} className="text-common-white" />
								<Typography.Paragraph>
									{item.currentWeekProgress} de {item.roundsTotal} Rounds
								</Typography.Paragraph>
							</View>
							<View>
								<View className="flex-row justify-between items-center mb-2">
									<Typography.Small>Progresso</Typography.Small>
									<Typography.Subtitle>{percentage}%</Typography.Subtitle>
								</View>
								<View className="w-full bg-layout-divider h-1 rounded">
									<View
										style={{ width: `${percentage}%` }}
										className="h-1 rounded bg-base-primary"
									/>
								</View>
							</View>
						</View>
					</View>
				)
			}}
		/>
	)
}
