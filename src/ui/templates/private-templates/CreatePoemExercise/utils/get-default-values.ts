import type { CreatePoemFields } from "@/schemas";

export function getDefaultValues(): CreatePoemFields {
	return {
		content: "",
		credits: { author: "", workName: "" },
	};
}
