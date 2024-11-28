import { View } from 'react-native'

import { Field } from '@/ui/components/form/field'
import { Button } from '@/ui/atoms/buttons/button'
import { Typography } from '@/ui/atoms/typography'
import { Container } from '@/ui/atoms/container'
import { Header } from '@/ui/components/header'
import { Links } from '@/ui/atoms/links'

import { useFocusNextField } from '@/hooks/use-focus-next-field'
import { useSignInForm } from './hooks/use-sign-in-form'

import { ROUTES } from '@/constants/routes'

export function SignInTemplate() {
	const { isSubmitting, errors, onSubmit, control } = useSignInForm()
	const passwordField = useFocusNextField()
	return (
		<Container>
			<Header.Root>
				<Header.Title>Olá novamente! Entre para continuar</Header.Title>
			</Header.Root>
			<View>
				<Field.Root
					control={control}
					name="email"
					render={(params) => (
						<Field.Content className="mb-4">
							<Field.Labels.Default nativeID={params.nativeID}>
								E-mail
							</Field.Labels.Default>
							<Field.Inputs.Default
								{...params}
								placeholder="Digite o seu e-mail"
								keyboardType="email-address"
								returnKeyType="next"
								onSubmitEditing={passwordField.handleFocus}
							/>
							<Field.Errors.Default message={errors.email?.message} />
						</Field.Content>
					)}
				/>
				<View>
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
									placeholder="Digite a sua senha"
									returnKeyType="go"
									onSubmitEditing={onSubmit}
								/>
								<Field.Errors.Default message={errors.password?.message} />
							</Field.Content>
						)}
					/>
					<Links.Default href={ROUTES.AUTH.FORGOT_PASSWORD} className='text-base-text font-heading text-sm text-right'>
						Esqueceu a senha?
					</Links.Default>
				</View>
				<View className="items-center mt-8">
					<Button
						label="Entrar"
						onPress={onSubmit}
						isLoading={isSubmitting}
						className="mb-4"
					/>
					<Typography.Paragraph>
						Não possui uma conta?{' '}
						<Links.Default
							href={ROUTES.AUTH.SIGN_UP}
							className="text-base-primary"
						>
							Criar agora
						</Links.Default>
					</Typography.Paragraph>
				</View>
			</View>
		</Container>
	)
}
