import { LogOut, UserRound } from 'lucide-react-native'

import { ConfirmBottomSheet } from '@/ui/components/bottom-sheet/confirm-bottom-sheet'
import { MenuOptions } from '@/ui/components/menu-options'
import { Container } from '@/ui/atoms/container'
import { Header } from '@/ui/components/header'

import { useBottomSheetControl } from '@/hooks/use-bottom-sheet-control'
import { useNavigation } from '@/hooks/use-navigation'
import { useSignOut } from './hooks/use-sign-out'

import { ROUTES } from '@/constants/routes'

export function SettingsTemplate() {
	const signOutBottomSheet = useBottomSheetControl()
	const { isLoading, handleSignOut } = useSignOut()
	const { push } = useNavigation()
	return (
		<>
			<Container>
				<Header.Root>
					<Header.Title>Configurações</Header.Title>
				</Header.Root>
				<MenuOptions.Root className="bg-layout-foreground pl-4 py-4">
					<MenuOptions.Content>
						<MenuOptions.Option
							label="Minha conta"
							onPress={() => push(ROUTES.APP.MY_ACCOUNT)}
							renderIcon={(_props) => <UserRound {..._props} />}
						/>
						<MenuOptions.Divider />
						<MenuOptions.Option
							label="Sair"
							variant="danger"
							onPress={signOutBottomSheet.handleOpen}
							renderIcon={(_props) => <LogOut {..._props} />}
						/>
					</MenuOptions.Content>
				</MenuOptions.Root>
			</Container>
			<ConfirmBottomSheet
				ref={signOutBottomSheet.ref}
				title="Você realmente deseja sair?"
				onCancel={signOutBottomSheet.handleClose}
				isLoading={isLoading}
				onConfirm={handleSignOut}
			/>
		</>
	)
}
