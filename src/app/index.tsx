import { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, View, type ViewToken } from 'react-native'
import { ChevronLeft, ChevronRight } from 'lucide-react-native'

import { ProtectScreen } from '@/ui/components/protect-screen'
import { Button } from '@/ui/atoms/buttons/button'
import { Typography } from '@/ui/atoms/typography'

import { SCREEN_WIDTH } from '@/constants/general'
import { SCREEN_ROLES } from '@/constants/keys'

import { colors } from '@/styles/theme'
import { cn } from '@/helpers/cn'

function Page() {
	const [currentItem, setCurrentItem] = useState(0)
	const ref = useRef<FlatList>(null)
	const isNotInTheFirstItem = currentItem > 0
	const isNotInTheLastItem = currentItem < data.length - 1

	const handleViewableChange = useRef((params: { changed: ViewToken[] }) => {
		const { changed } = params
		if (!changed[0].isViewable) return
		setCurrentItem(changed[0].index as number)
	})

	const scrollToIndex = useCallback((index: number) => {
		if (!ref.current) return
		ref.current.scrollToIndex({ animated: true, index })
	}, [])

	const handleIncrementItem = useCallback(() => {
		if (currentItem === data.length - 1) return
		setCurrentItem((prevState) => prevState + 1)
	}, [currentItem])

	const handleDecrementItem = useCallback(() => {
		if (currentItem === 0) return
		setCurrentItem((prevState) => prevState - 1)
	}, [currentItem])

	useEffect(() => {
		if (currentItem >= 0 && currentItem < data.length) {
			scrollToIndex(currentItem)
		}
	}, [currentItem, scrollToIndex])

	return (
		<View className="flex-1">
			<FlatList
				ref={ref}
				data={data}
				keyExtractor={(_, index) => index.toString()}
				horizontal
				pagingEnabled
				onViewableItemsChanged={handleViewableChange.current}
				initialScrollIndex={currentItem}
				showsHorizontalScrollIndicator={false}
				viewabilityConfig={{ viewAreaCoveragePercentThreshold: 95 }}
				renderItem={({ item }) => (
					<View style={{ width: SCREEN_WIDTH }}>
						<Typography.Title>{item}</Typography.Title>
					</View>
				)}
			/>
			<View className="flex-row gap-x-2">
				{data.map((_, i) => (
					<View
						key={i}
						className={cn('w-2 h-2 bg-layout-divider rounded-full', {
							'bg-base-primary': i === currentItem,
						})}
					/>
				))}
			</View>
			<View
				className={cn('p-4 justify-end flex-row gap-4', {
					'justify-between': isNotInTheFirstItem,
				})}
			>
				{isNotInTheLastItem ? (
					<>
						{isNotInTheFirstItem && (
							<Button
								variant="secondary"
								size="icon"
								onPress={handleDecrementItem}
							>
								<ChevronLeft color={colors.base.text} />
							</Button>
						)}
						<Button size="icon" onPress={handleIncrementItem}>
							<ChevronRight color={colors.base['text-foreground']} />
						</Button>
					</>
				) : (
					<Button className="w-auto flex-1" label="Começar" />
				)}
			</View>
		</View>
	)
}

const data = ['item_1', 'item_2', 'item_3']

export default ProtectScreen(Page, { screenRole: SCREEN_ROLES.PUBLIC })
