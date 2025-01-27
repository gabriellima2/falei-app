import { fireEvent, render, screen } from '@testing-library/react-native'

import { TongueTwister } from '../tongue-twister'
import { CUSTOM_CODE_FOR_BREAK_LINE, CUSTOM_CODE_FOR_WHITE_SPACE } from '@/constants/general'

describe('<TongueTwister />', () => {
	describe('Body', () => {
		it('should display the correct body content', () => {
			renderComponent()

			expect(screen.getByText('first_textmid_textlast_text')).toBeTruthy()
		})
	})
	describe('Actions', () => {
		it('should invoke the callback function when the exercise is pressed', () => {
			renderComponent()

			const exercise = screen.getByTestId('exercise-root')
			fireEvent.press(exercise)

			expect(defaultProps.onPress).toHaveBeenCalledTimes(1)
			expect(defaultProps.onPress).toHaveBeenCalledWith(defaultProps.id)
		})
	})
})

const defaultProps: Parameters<typeof TongueTwister>[0] = {
	id: '1',
	body: `first_text${CUSTOM_CODE_FOR_WHITE_SPACE}mid_text${CUSTOM_CODE_FOR_BREAK_LINE}last_text`,
	onPress: jest.fn(),
}

function renderComponent(props = defaultProps): ReturnType<typeof render> {
	return render(<TongueTwister {...props} />)
}
