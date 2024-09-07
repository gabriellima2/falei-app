import styled from 'styled-components/native'
import { LoadingIndicator } from './loading-indicator'

export function Splash() {
	return (
		<Container>
			<Logo source={require('../../../assets/splash.png')} resizeMode="cover">
				<LoadingIndicator />
			</Logo>
		</Container>
	)
}

const Container = styled.View`
	flex: 1;
	background-color: #000000;
`

const Logo = styled.ImageBackground`
	flex: 1;
	justify-content: flex-end;
	padding: 16;
`
