import { Rect, Triangle } from './shapes.js'

export class CollisionDisplacement {
	constructor(
		public x:number,
		public y:number
	) {}
}

export const rect_rect_collision = (rect1: Rect, rect2: Rect): CollisionDisplacement|null => {
	return null
}

export const rect_triangle_collision = (rect: Rect, triangle: Triangle): CollisionDisplacement|null => {
	return null
}
