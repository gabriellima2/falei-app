import { View, type ViewProps } from "react-native"

type OverlayProps = Omit<ViewProps, 'className'>

export function Overlay(props: OverlayProps) {
	return <View {...props} className="bg-layout-overlay" />
}
