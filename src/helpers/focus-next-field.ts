import { MutableRefObject } from "react";
import { TextInput } from "react-native";

export function focusNextField(fieldRef: MutableRefObject<null | TextInput>) {
	if (!fieldRef.current) return;
	fieldRef.current.focus();
}
