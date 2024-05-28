import { wait } from './utils';

export const requestModel = (model: string | number): Promise<void> => {
	return new Promise<void>(async resolve => {
		RequestModel(model);

		while (!HasModelLoaded(model)) {
			await wait(100);
		}

		resolve();
	});
};
