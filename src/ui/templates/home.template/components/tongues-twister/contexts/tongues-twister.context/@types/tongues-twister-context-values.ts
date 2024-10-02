import type { BottomSheetModalRef } from "@/@types/general"

export type TonguesTwisterContextValues = {
	readTongueTwisterBottomSheetRef: BottomSheetModalRef | null
	tongueTwisterId: string | null

	handleOpenReadTongueTwisterBottomSheet: (id: string | null) => void
}
