import type { BottomSheetModalRef } from "@/@types/general"

export type TonguesTwisterContextValues = {
	readTongueTwisterBottomSheetRef: BottomSheetModalRef | null
	tongueTwisterId: string | null

	handleReadTongueTwister: (id: string | null) => void
}
