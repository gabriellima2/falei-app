import { fireEvent, render, screen } from '@testing-library/react-native'
import { Goal } from '../goal'

describe('<Goal />', () => {
	describe('Progress', () => {
		it('should display the correct progress', () => {
			renderComponent()

			expect(
				screen.getByText(
					`${defaultProps.currentWeekProgress} de ${defaultProps.frequencyPerWeek}`,
				),
			).toBeTruthy()
		})
	})
	describe('Duration time', () => {
		it('should display the correct duration in seconds', () => {
			renderComponent()

			expect(screen.getByText('42 seg.')).toBeTruthy()
		})
		it('should display the correct duration in minutes when total time is 60 seconds or more', () => {
			renderComponent({
				...defaultProps,
				steps: { exhale: 10000, hold: 10000, inhale: 10000 },
			})


			expect(screen.getByText('1 min.')).toBeTruthy()
		})
	})
	describe('Actions', () => {
		it('should invoke the callback function when the menu is pressed', () => {
			renderComponent()

			const menu = screen.getByTestId('exercise-menu')
			fireEvent.press(menu)

			expect(defaultProps.onMenuPress).toHaveBeenCalledTimes(1)
			expect(defaultProps.onMenuPress).toHaveBeenCalledWith(defaultProps.id)
		})
		it('should invoke the callback function when the exercise is pressed', () => {
			renderComponent()

			const exercise = screen.getByTestId('exercise-root')
			fireEvent.press(exercise)

			expect(defaultProps.onPress).toHaveBeenCalledTimes(1)
			expect(defaultProps.onPress).toHaveBeenCalledWith(defaultProps.id)
		})
	})
})

const defaultProps: Parameters<typeof Goal>[0] = {
	id: '1',
	roundsTotal: 3,
	steps: {
		exhale: 5000,
		hold: 4000,
		inhale: 5000
	},
	title: 'any_title',
	onMenuPress: jest.fn(),
	onPress: jest.fn(),
	currentWeekProgress: 1,
	frequencyPerWeek: 4,
}

function renderComponent(props = defaultProps): ReturnType<typeof render> {
	return render(<Goal {...props} />)
}
