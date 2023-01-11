import Game from './game.js'
import { Rect } from './shapes.js'

const START_SPEED = 2
const MAX_SPEED = 5
const JUMP_SPEED = 10
const ACCELERATION = 0.5

export class Player {
	color = 'green'
	rect = new Rect(0, 0, 40, 40)
	vel = { x: 0, y: 0 }
	canJump = false
	acceleration = 0
	constructor(public game: Game) {}
	draw(ctx: CanvasRenderingContext2D) {
		this.rect.draw(ctx, this.color)
	}
	update() {
		this.vel.y += this.game.gravity
		this.rect.y += this.vel.y
		this.rect.x += this.vel.x
		this.game.obstacles.forEach((obstacle) => {
			const collision = obstacle.collide(this.rect)
			if (collision) {
				if (collision.y > 0) {
					this.canJump = true
				}
				this.rect.y -= collision.y
				this.rect.x -= collision.x
			}
		})
		if (this.game.controller.up && this.canJump) {
			this.vel.y = -JUMP_SPEED
			this.canJump = false
		}
		if (this.vel.x > MAX_SPEED) {
			this.vel.x = MAX_SPEED
		} else if (this.vel.x < -MAX_SPEED) {
			this.vel.x = -MAX_SPEED
		}
		if (this.rect.y <= 0) {
			this.rect.y = 0
		} else if (this.rect.y > this.game.height - this.rect.h) {
			this.rect.y = this.game.height - this.rect.h
			this.canJump = true
			if (this.vel.x > 0) {
				this.vel.x -= Math.min(this.game.groundFriction, this.vel.x)
			} else if (this.vel.x < 0) {
				this.vel.x += Math.min(this.game.groundFriction, -this.vel.x)
			}
		}
		if (this.canJump) {
			this.acceleration = 0
			if (this.game.controller.left) {
				this.left()
			}
			if (this.game.controller.right) {
				this.right()
			}
			this.vel.x += this.acceleration
		}
		if (this.rect.x <= 0) {
			this.rect.x = 0
		} else if (this.rect.x > this.game.width - this.rect.w) {
			this.rect.x = this.game.width - this.rect.w
		}
	}
	left() {
		if (!this.vel.x) {
			this.vel.x = -START_SPEED
			this.acceleration = -ACCELERATION
		} else if (this.game.controller.direction === 'L') {
			if (this.vel.x > -START_SPEED) this.vel.x = -START_SPEED
			this.acceleration = -ACCELERATION
		}
	}
	right() {
		if (!this.vel.x) {
			this.vel.x = START_SPEED
			this.acceleration = ACCELERATION
		} else if (this.game.controller.direction === 'R') {
			if (this.vel.x < START_SPEED) this.vel.x = START_SPEED
			this.acceleration = ACCELERATION
		}
	}
}
