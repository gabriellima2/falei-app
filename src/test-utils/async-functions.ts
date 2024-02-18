export const asyncFunctions = {
	resolved: jest.fn().mockImplementation(() => {
		return new Promise((resolve) => resolve);
	}),
	rejected: (error: string) => jest.fn(() => Promise.reject(new Error(error))),
};
