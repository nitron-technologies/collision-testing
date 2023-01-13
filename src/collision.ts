import { Rect, Triangle } from './shapes.js'

export class CollisionDisplacement {
	constructor(
		public x:number,
		public y:number
	) {}
}

export const rect_rect_collision = (rect1: Rect, rect2: Rect): CollisionDisplacement|null => {
	
	// const dleft = rect1.x - (rect2.x + rect2.w)
	// const dright = (rect1.x + rect1.w) - rect2.x
	// const dtop = rect1.y - (rect2.y + rect2.h)
	// const dbottom = (rect1.y + rect1.h) - rect2.y

	
	// return (rect1.y + rect1.h) < rect2.y || 
	// 	rect1.y > (rect2.y + rect2.h) || 
	// 	(rect1.x + rect1.w) < rect2.x || 
	// 	rect1.x > (rect2.x + rect2.w) ? 
	// null : 
	
	// absmin(dleft, dright, dtop, dbottom) ?
	// new CollisionDisplacement(dleft, 0) :

	// absmin(dright, dleft, dtop, dbottom) ?
	// new CollisionDisplacement(dright, 0) :

	// absmin(dtop, dleft, dright, dbottom) ?
	// new CollisionDisplacement(0, dtop) :

	// absmin(dbottom, dleft, dright, dtop) ?
	// new CollisionDisplacement(0, dbottom) :

	// null

	const iscollision = (rect1.y + rect1.h) < rect2.y ||
		rect1.y > (rect2.y + rect2.h) ||
		(rect1.x + rect1.w) < rect2.x ||
		rect1.x > (rect2.x + rect2.w) 

	if (!iscollision) {

		const xOverlap = Math.max(0, Math.min(rect1.x + rect1.w, rect2.x + rect2.w) - Math.max(rect1.x, rect2.x))
		const yOverlap = Math.max(0, Math.min(rect1.y + rect1.h, rect2.y + rect2.h) - Math.max(rect1.y, rect2.y))

		if (xOverlap < yOverlap) {
			return rect1.x < rect2.x ?
				new CollisionDisplacement(xOverlap, 0) :
				new CollisionDisplacement(-xOverlap, 0)
		} else {
			return rect1.y < rect2.y ?
				new CollisionDisplacement(0, yOverlap) :
				new CollisionDisplacement(0, -yOverlap)
		}

	}



}

export const absmin = (a: number, b: number, c: number, d: number): boolean => {
	return Math.abs(a) == Math.min(Math.abs(a), Math.abs(b), Math.abs(c), Math.abs(d)) ? true : false
}

export const rect_triangle_collision = (rect: Rect, triangle: Triangle): CollisionDisplacement|null => {
	return null
}
