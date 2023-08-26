import { forwardRef, useMemo } from "react";
import { type SharedValue } from "react-native-reanimated";
import BottomSheetLib, {
	type BottomSheetProps as BottomSheetLibProps,
} from "@gorhom/bottom-sheet";
import { useTheme } from "styled-components/native";

type BottomSheetProps = Omit<BottomSheetLibProps, "snapPoints"> & {
	snapPoints?: (string | number)[] | SharedValue<(string | number)[]>;
};

export const BottomSheet = forwardRef<BottomSheetLib, BottomSheetProps>(
	(props, ref) => {
		const { snapPoints } = props;
		const { colors } = useTheme();
		const defaultSnapPoints = useMemo(() => [1, "60%"], []);

		return (
			<BottomSheetLib
				{...props}
				ref={ref}
				index={0}
				enablePanDownToClose
				backgroundStyle={{ backgroundColor: `${colors.utils.darkGray}` }}
				style={{ paddingVertical: 8, paddingHorizontal: 16 }}
				handleIndicatorStyle={{
					backgroundColor: colors.overlay,
					width: "40%",
					height: 8,
				}}
				snapPoints={snapPoints ? snapPoints : defaultSnapPoints}
			/>
		);
	}
);

BottomSheet.displayName = "BottomSheet";
