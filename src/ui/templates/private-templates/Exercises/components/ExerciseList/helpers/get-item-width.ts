import { dimensions } from "@/constants/dimensions";
import { getTotalColumns } from "./get-total-columns";

export const getItemWidth = () =>
	(dimensions.window.withMargin.width - 16) / getTotalColumns();
