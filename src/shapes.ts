export class Rect {
	constructor(public x: number, public y: number, public w: number, public h: number) {}
	draw(ctx: CanvasRenderingContext2D, color: string) {
		ctx.fillStyle = color
		ctx.fillRect(this.x, this.y, this.w, this.h)
	}
}
export class Point {
	constructor(public x: number, public y: number) {}
}
export const P = (x: number, y: number) => new Point(x, y)
export class Triangle {
	constructor(public p1: Point, public p2: Point, public p3: Point) {}
	draw(ctx: CanvasRenderingContext2D, color: string) {
		ctx.fillStyle = color
		ctx.beginPath()
		ctx.moveTo(this.p1.x, this.p1.y)
		ctx.lineTo(this.p2.x, this.p2.y)
		ctx.lineTo(this.p3.x, this.p3.y)
		ctx.closePath()
		ctx.fill()
	}
}
