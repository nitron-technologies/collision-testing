import { CollisionDisplacement, rect_rect_collision, rect_triangle_collision } from "./collision.js";
import { P, Rect, Triangle } from "./shapes.js";

class RectObstacle {
	constructor(
		public rect: Rect,
		public color: string
	) {}
	draw(ctx: CanvasRenderingContext2D) {
		this.rect.draw(ctx, this.color)
	}
	collide(rect: Rect):CollisionDisplacement|null {
		return rect_rect_collision(rect, this.rect)
	}
}

class TriangleObstacle {
	constructor(
		public triangle: Triangle,
		public color: string
	) {}
	draw(ctx: CanvasRenderingContext2D) {
		this.triangle.draw(ctx, this.color)
	}
	collide(rect: Rect):CollisionDisplacement|null {
		return rect_triangle_collision(rect, this.triangle)
	}
}

export type Obstacle = RectObstacle | TriangleObstacle

export const loadObstacles = (): Obstacle[] => {
	return [
		new RectObstacle(new Rect(0, 560, 100, 40), "red"),
		new RectObstacle(new Rect(0, 460, 80, 100), "yellow"),
		new TriangleObstacle(new Triangle(P(0, 400), P(80, 460), P(0, 460)), "pink"),
		new TriangleObstacle(new Triangle(P(250, 550), P(400, 600), P(200, 600)), "purple"),
		new TriangleObstacle(new Triangle(P(650, 450), P(750, 550), P(500, 600)), "blue"),
		new TriangleObstacle(new Triangle(P(750, 600), P(750, 550), P(500, 600)), "blue"),
		new RectObstacle(new Rect(750, 400, 50, 50), "white"),
	]
}