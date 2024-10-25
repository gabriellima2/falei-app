import { View } from 'react-native'

import { Field } from '@/ui/components/form/field'
import { Button } from '@/ui/atoms/buttons/button'
import { Typography } from '@/ui/atoms/typography'
import { Container } from '@/ui/atoms/container'
import { Header } from '@/ui/components/header'

import { useFocusNextField } from '@/hooks/use-focus-next-field'

export function SignUpTemplate() {
	const passwordField = useFocusNextField()
	return (
		<Container>
			<Header.Root>
				<Header.Title>Bem, vindo! Crie uma conta para continuar</Header.Title>
			</Header.Root>
			<View>
				<Field.Root className="mb-4">
					<Field.Labels.Default>Email</Field.Labels.Default>
					<Field.Inputs.Default
						placeholder="Digite o seu email"
						keyboardType="email-address"
						returnKeyType="next"
						onSubmitEditing={passwordField.handleFocus}
					/>
				</Field.Root>
				<Field.Root>
					<Field.Labels.Default>Senha</Field.Labels.Default>
					<Field.Inputs.Password
						ref={passwordField.fieldRef}
						placeholder="Digite uma senha"
						returnKeyType="go"
					/>
				</Field.Root>
				<View className='items-center mt-8'>
					<Button label="Criar conta" className='mb-8' />
					<Typography.Paragraph>
						Já possui uma conta?{' '}
						<Typography.Paragraph className="text-base-primary">
							Entrar
						</Typography.Paragraph>
					</Typography.Paragraph>
				</View>
			</View>
		</Container>
	)
}
