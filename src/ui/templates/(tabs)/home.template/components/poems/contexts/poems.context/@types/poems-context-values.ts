import type { BottomSheetModalRef } from "@/@types/general"

export type PoemsContextValues = {
	readPoemBottomSheetRef: BottomSheetModalRef | null
	poemId: string | null

	handleReadPoem: (id: string | null) => void
}
