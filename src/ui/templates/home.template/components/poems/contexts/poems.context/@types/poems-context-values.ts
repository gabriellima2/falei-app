import type { BottomSheetModalRef } from "@/@types/general"

export type PoemsContextValues = {
	readPoemBottomSheetRef: BottomSheetModalRef | null
	poemId: string | null

	handleOpenReadPoemBottomSheet: (id: string | null) => void
}
