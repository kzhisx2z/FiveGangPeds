import { BoxZone, Vector3, Vector4 } from './boxzone';
import { requestModel } from './streaming';
import { wait } from './utils';

const peds: number[] = [];

addEventListener(
	'onResourceStop',
	(resource: string) => {
		if (GetCurrentResourceName() !== resource) {
			return;
		}

		for (const ped of peds) {
			DeletePed(ped);
		}
	},
	true,
);

interface SpawnPedOptions {
	coords?: Vector4;
	scenario?: string;
	static?: boolean;
}

const spawnPed = async (
	model: string | number,
	options?: SpawnPedOptions,
): Promise<number> => {
	const playerPed: number = PlayerPedId();
	let coords: Vector4 = options?.coords;

	if (!coords) {
		const [x, y, z]: Vector3 = GetEntityCoords(playerPed, true) as Vector3;
		coords = [x, y, z, GetEntityHeading(playerPed)];
	}

	await requestModel(model);

	const [x, y, z, w] = coords;
	const [_, groundZ] = GetGroundZFor_3dCoord(x, y, z, true);

	const ped = CreatePed(0, model, x, y, groundZ, w, true, true);

	SetModelAsNoLongerNeeded(model);

	peds.push(ped);

	while (!DoesEntityExist(ped)) {
		await wait(50);
	}

	if (options?.static) {
		SetBlockingOfNonTemporaryEvents(ped, true);
		SetEntityInvincible(ped, true);
		FreezeEntityPosition(ped, true);
	}

	if (options?.scenario) {
		TaskStartScenarioInPlace(ped, options.scenario, 0, true);
	}

	return ped;
};

const walkToCoords = async (
	coords: Vector4,
	ped?: number,
	timeout: number = 5000,
): Promise<void> => {
	if (!ped) {
		ped = PlayerPedId();
	}

	const [x, y, z, w] = coords;

	TaskGoStraightToCoord(ped, x, y, z, 1.0, timeout, w, 0.1);

	const zone: BoxZone = new BoxZone(coords, 1, 1);
	const interval: number = 500;

	for (let i = 0; i < timeout - interval; i += interval) {
		if (
			zone.isPointInside(GetEntityCoords(ped, true) as Vector3) &&
			Math.abs(GetEntityHeading(ped) - w) < 5
		) {
			break;
		}

		await wait(interval);
	}

	await wait(interval);
};

exports('spawnPed', spawnPed);
exports('walkToCoords', walkToCoords);
