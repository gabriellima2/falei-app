import type { CreateTongueTwisterFields } from "@/schemas";

export function getDefaultValues(): CreateTongueTwisterFields {
	return {
		content: "",
		author: "",
	};
}
