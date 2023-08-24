import { forwardRef, useMemo } from "react";
import { type SharedValue } from "react-native-reanimated";
import BottomSheetLib, {
	type BottomSheetProps as BottomSheetLibProps,
} from "@gorhom/bottom-sheet";

type BottomSheetProps = Omit<BottomSheetLibProps, "snapPoints"> & {
	snapPoints?: (string | number)[] | SharedValue<(string | number)[]>;
};

export const BottomSheet = forwardRef<BottomSheetLib, BottomSheetProps>(
	(props, ref) => {
		const { snapPoints } = props;
		const defaultSnapPoints = useMemo(() => [1, "60%"], []);

		return (
			<BottomSheetLib
				{...props}
				ref={ref}
				index={0}
				enablePanDownToClose
				snapPoints={snapPoints ? snapPoints : defaultSnapPoints}
			/>
		);
	}
);

BottomSheet.displayName = "BottomSheet";
