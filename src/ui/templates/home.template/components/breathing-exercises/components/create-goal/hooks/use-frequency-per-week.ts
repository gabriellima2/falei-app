import { useCallback, useState } from 'react'

export function useFrequencyPerWeek() {
	const [frequencyPerWeek, setFrequencyPerWeek] = useState(1)

	const handleSetFrequencyPerWeek = useCallback((value?: string | number) => {
		const formattedValue = Number(value)
		if (Number.isNaN(formattedValue)) return
		setFrequencyPerWeek(formattedValue)
	}, [])

	return {
		frequencyPerWeek,
		handleSetFrequencyPerWeek,
	}
}
