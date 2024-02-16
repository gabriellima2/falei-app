import { ReactNode, forwardRef } from "react";
import styled, { css, useTheme } from "styled-components/native";
import BottomSheetLib, {
	BottomSheetScrollView,
	type BottomSheetProps as BottomSheetLibProps,
} from "@gorhom/bottom-sheet";

type BottomSheetProps = Omit<BottomSheetLibProps, "snapPoints"> & {
	snapPoints?: (string | number)[];
};

export const BottomSheet = forwardRef<BottomSheetLib, BottomSheetProps>(
	(props, ref) => {
		const { children, ...rest } = props;
		const { colors } = useTheme();
		return (
			<BottomSheetLib
				{...rest}
				ref={ref}
				index={0}
				enableDynamicSizing
				enablePanDownToClose
				backgroundStyle={{ backgroundColor: `${colors.utils.darkGray}` }}
				style={{ paddingVertical: 8, paddingHorizontal: 16 }}
				handleIndicatorStyle={{
					backgroundColor: colors.overlay,
					width: "40%",
					height: 8,
				}}
			>
				<BottomSheetScrollView>
					<Content>{children as ReactNode}</Content>
				</BottomSheetScrollView>
			</BottomSheetLib>
		);
	}
);

BottomSheet.displayName = "BottomSheet";

const Content = styled.View`
	${({ theme }) => css`
		padding-bottom: ${theme.spaces[2]};
	`}
`;
