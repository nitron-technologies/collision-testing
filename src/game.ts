import { Controller } from './controller.js'
import { loadObstacles, Obstacle } from './obstacle.js'
import { Player } from './player.js'

const GRAVITY = 0.5
const GROUND_FRICTION = 0.4

export default class Game {
	width: number
	height: number
	gravity: number = GRAVITY
	groundFriction: number = GROUND_FRICTION
	player: Player
	obstacles: Obstacle[]
	controller: Controller

	constructor(width: number, height: number) {
		this.width = width
		this.height = height
		this.controller = new Controller('wasd')
		this.player = new Player(this)
		this.obstacles = loadObstacles()
	}
	update() {
		this.player.update()
		// this.obstacles.forEach((obstacle) => obstacle.update())
	}
	draw(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = 'black'
		ctx.fillRect(0, 0, this.width, this.height)
		this.obstacles.forEach((obstacle) => obstacle.draw(ctx))
		this.player.draw(ctx)
	}
}
