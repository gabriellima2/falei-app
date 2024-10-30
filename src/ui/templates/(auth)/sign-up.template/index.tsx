import { View } from 'react-native'

import { Field } from '@/ui/components/form/field'
import { Button } from '@/ui/atoms/buttons/button'
import { Typography } from '@/ui/atoms/typography'
import { Container } from '@/ui/atoms/container'
import { Header } from '@/ui/components/header'
import { Links } from '@/ui/atoms/links'

import { useFocusNextField } from '@/hooks/use-focus-next-field'
import { useSignUpForm } from './hooks/use-sign-up-form'

import { ROUTES } from '@/constants/routes'

export function SignUpTemplate() {
	const { isSubmitting, errors, onSubmit, control } = useSignUpForm()
	const passwordField = useFocusNextField()
	return (
		<Container>
			<Header.Root>
				<Header.Title>Bem-vindo! Crie uma conta para continuar</Header.Title>
			</Header.Root>
			<View>
				<Field.Root
					control={control}
					name="email"
					render={(params) => (
						<Field.Content className="mb-4">
							<Field.Labels.Default nativeID={params.nativeID}>
								Email
							</Field.Labels.Default>
							<Field.Inputs.Default
								{...params}
								placeholder="Digite o seu email"
								keyboardType="email-address"
								returnKeyType="next"
								onSubmitEditing={passwordField.handleFocus}
							/>
							<Field.Errors.Default message={errors.email?.message} />
						</Field.Content>
					)}
				/>
				<Field.Root
					control={control}
					name="password"
					render={(params) => (
						<Field.Content>
							<Field.Labels.Default nativeID={params.nativeID}>
								Senha
							</Field.Labels.Default>
							<Field.Inputs.Password
								{...params}
								ref={passwordField.fieldRef}
								placeholder="Digite uma senha"
								returnKeyType="go"
								onSubmitEditing={onSubmit}
							/>
							<Field.Errors.Default message={errors.password?.message} />
						</Field.Content>
					)}
				/>
				<View className="items-center mt-8">
					<Button
						label="Criar conta"
						onPress={onSubmit}
						isLoading={isSubmitting}
						className="mb-4"
					/>
					<Typography.Paragraph>
						Já possui uma conta?{' '}
						<Links.Default href={ROUTES.AUTH.SIGN_IN} className="text-base-primary">
							Entrar
						</Links.Default>
					</Typography.Paragraph>
				</View>
			</View>
		</Container>
	)
}
