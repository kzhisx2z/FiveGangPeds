type Vector2 = [number, number];
export type Vector3 = [number, number, number];
export type Vector4 = [number, number, number, number];

export const rotatePoint = (
	center: Vector2 | Vector3 | Vector4,
	point: Vector2 | Vector3,
	angleInRad: number,
): Vector2 => {
	const cos: number = Math.cos(angleInRad);
	const sin: number = Math.sin(angleInRad);

	const x: number = point[0] - center[0];
	const y: number = point[1] - center[1];

	const newX: number = x * cos - y * sin;
	const newY: number = x * sin + y * cos;

	return [newX + center[0], newY + center[1]];
};

interface PolygonZoneOptions {
	minZ?: number;
	maxZ?: number;
}

interface Zone {
	isPointInside(point: Vector3): boolean;
}

class PolygonZone implements Zone {
	private readonly minZ?: number;
	private readonly maxZ?: number;

	protected points: (Vector2 | Vector3)[];

	constructor(points: (Vector2 | Vector3)[], options?: PolygonZoneOptions) {
		this.points = points;
		this.minZ = options?.minZ;
		this.maxZ = options?.maxZ;

		if (this.maxZ < this.minZ) {
			const minZ: number = this.minZ;
			this.minZ = this.maxZ;
			this.maxZ = minZ;
		}

		const latestPoint: Vector2 | Vector3 = points[this.points.length - 1];

		if (
			points[0][0] !== latestPoint[0] ||
			points[0][1] !== latestPoint[1]
		) {
			this.points.push(points[0]);
		}
	}

	public isPointInside(point: Vector3): boolean {
		if (this.minZ && point[2] < this.minZ) {
			return false;
		}

		if (this.maxZ && point[2] > this.maxZ) {
			return false;
		}

		const sides: number = this.points.length;
		let count: number = 0;
		const x: number = point[0];
		const y: number = point[1];

		for (let i = 0; i < sides - 1; i++) {
			const side = {
				a: {
					x: this.points[i][0],
					y: this.points[i][1],
				},
				b: {
					x: this.points[i + 1][0],
					y: this.points[i + 1][1],
				},
			};

			const x1: number = side.a.x;
			const y1: number = side.a.y;
			const x2: number = side.b.x;
			const y2: number = side.b.y;

			if (
				y1 > y !== y2 > y &&
				x < ((x2 - x1) * (y - y1)) / (y2 - y1) + x1
			) {
				count++;
			}
		}

		return count % 2 !== 0;
	}
}

interface BoxZoneOptions extends PolygonZoneOptions {
	heading?: number;
}

export class BoxZone extends PolygonZone {
	constructor(
		center: Vector3 | Vector4,
		length: number,
		width: number,
		options?: BoxZoneOptions,
	) {
		const points: Vector2[] = [];
		const heading: number = options?.heading ?? 0;
		const angleInRad: number = (heading * Math.PI) / 180;

		points.push(
			rotatePoint(
				center,
				[center[0] - width / 2, center[1] - length / 2],
				angleInRad,
			),
		);
		points.push(
			rotatePoint(
				center,
				[center[0] - width / 2, center[1] + length / 2],
				angleInRad,
			),
		);
		points.push(
			rotatePoint(
				center,
				[center[0] + width / 2, center[1] + length / 2],
				angleInRad,
			),
		);
		points.push(
			rotatePoint(
				center,
				[center[0] + width / 2, center[1] - length / 2],
				angleInRad,
			),
		);
		points.push(
			rotatePoint(
				center,
				[center[0] - width / 2, center[1] - length / 2],
				angleInRad,
			),
		);

		super(points, options);
	}
}
