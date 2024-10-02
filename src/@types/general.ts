import type { RefObject } from 'react'
import type { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import type { UseQueryOptions } from '@tanstack/react-query'
import type { BottomSheetModal } from '@gorhom/bottom-sheet'
import type BottomSheet from '@gorhom/bottom-sheet'

export type QueryOptions<T> = Omit<UseQueryOptions<T>, 'queryFn' | 'queryKey'>

export type BottomSheetElementRef = BottomSheet
export type BottomSheetModalElementRef = BottomSheetModal
export type BottomSheetModalRef = RefObject<BottomSheetModalMethods>
