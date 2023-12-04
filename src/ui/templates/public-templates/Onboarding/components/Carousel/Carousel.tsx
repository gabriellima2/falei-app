import { CarouselList } from "@/ui/components";
import { Item } from "./components/Item";

import type { Onboarding } from "../../@types/onboarding";

type CarouselProps = {
	items: Onboarding[];
	currentItem: number;
	onCurrentItemChange: (index: number) => void;
};

export const Carousel = (props: CarouselProps) => {
	const { items, currentItem, onCurrentItemChange } = props;
	return (
		<CarouselList
			data={items}
			currentItem={currentItem}
			changeCurrentItem={onCurrentItemChange}
			Item={(props) => <Item {...props} img={props.image} />}
		/>
	);
};
