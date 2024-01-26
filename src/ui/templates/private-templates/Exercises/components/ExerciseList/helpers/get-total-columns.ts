import { dimensions } from "@/constants/dimensions";

const MIN_COLUMN_WIDTH = 180;

export const getTotalColumns = () =>
	Math.round((dimensions.window.withMargin.width - 16) / MIN_COLUMN_WIDTH);
