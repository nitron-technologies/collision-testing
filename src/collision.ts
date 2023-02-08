import { Rect, Triangle, Point } from './shapes.js'

export class CollisionDisplacement {
	constructor(
		public x:number,
		public y:number
	) {}
}


export const rect_rect_collision = (rect1: Rect, rect2: Rect): CollisionDisplacement|null => {
	

	const noCollision = (rect1.y + rect1.h) < rect2.y ||
		rect1.y > (rect2.y + rect2.h) ||
		(rect1.x + rect1.w) < rect2.x ||
		rect1.x > (rect2.x + rect2.w) 

	if (!noCollision) {

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

	return null


}

const getEdges = (triangle : Triangle) => {
	return [
		[triangle.p1, triangle.p2],
		[triangle.p2, triangle.p3],
		[triangle.p3, triangle.p1]
	]
}

const getRectLines = (rect: Rect): Point[][] => {
	return [
		[{x: rect.x, y: rect.y}, {x: rect.x + rect.w, y: rect.y}],
		[{x: rect.x + rect.w, y: rect.y}, {x: rect.x + rect.w, y: rect.y + rect.h}],
		[{x: rect.x + rect.w, y: rect.y + rect.h}, {x: rect.x, y: rect.y + rect.h}],
		[{x: rect.x, y: rect.y + rect.h}, {x: rect.x, y: rect.y}]
	]
}


// Using the separating axis theorem to check for collision between two line segments
const check_line_intersection = (line1: Point[], line2: Point[]): boolean => {
	// a1 is line1 start, a2 is line1 end, b1 is line2 start, b2 is line2 end
	const a1 = line1[0]
	const a2 = line1[1]
	const b1 = line2[0]
	const b2 = line2[1]

	const line1diff = {x: a2.x - a1.x, y: a2.y - a1.y}
	const line2diff = {x: b2.x - b1.x, y: b2.y - b1.y}
	const dotprod = line1diff.x * line2diff.y - line1diff.y * line2diff.x
	if (dotprod == 0) return false

	const c = {x: b1.x - a1.x, y: b1.y - a1.y}
	const t = (c.x * line2diff.y - c.y * line2diff.x) / dotprod
	if (t < 0 || t > 1) return false

	const u = (c.x * line1diff.y - c.y * line1diff.x) / dotprod
	if (u < 0 || u > 1) return false

	return true
}


const check_tri_rect_lines = (rect: Rect, triangle: Triangle): boolean => {
	const edges = getEdges(triangle)
	const rectLines = getRectLines(rect)
	for (const edge of edges) {
		for (const line of rectLines) {
			if (check_line_intersection(edge, line)) return true
			console.log(edge)
			console.log(line)
			console.log(check_line_intersection(edge, line))
			console.log("\n")
		}
		
	}
	return false
}

export const rect_tri_collision = (rect: Rect, triangle: Triangle): CollisionDisplacement|null => {
	const collision = check_tri_rect_lines(rect, triangle)
	if (collision) {
		const rectCenter = {x: rect.x + rect.w / 2, y: rect.y + rect.h / 2}
		const triCenter = {x: (triangle.p1.x + triangle.p2.x + triangle.p3.x) / 3, y: (triangle.p1.y + triangle.p2.y + triangle.p3.y) / 3}
		const diff = {x: triCenter.x - rectCenter.x, y: triCenter.y - rectCenter.y}
		return new CollisionDisplacement(diff.x, diff.y)
		// return new CollisionDisplacement(1, 1)
	}
	return null
}

