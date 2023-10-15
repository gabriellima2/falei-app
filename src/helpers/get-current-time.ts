import { time } from "./time";

export function getCurrentTime() {
	return new Date(`1970-01-01T${time.hour}Z`).getTime();
}
