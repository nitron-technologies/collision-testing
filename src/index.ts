import Game from './game.js'

const FPS_INTERVAL = 1000 / 50
const WIDTH = 800
const HEIGHT = 600

const throwError = (e: string): never => {
	throw new Error(e)
}

let canvas = document.getElementById('gameScreen')
if (!(canvas instanceof HTMLCanvasElement)) throw new Error('Canvas not found')
let ctx = canvas.getContext('2d') ?? throwError('Context not found')

let game = new Game(WIDTH, HEIGHT)

let then = Date.now()

const gameLoop = () => {
	requestAnimationFrame(gameLoop)
	let now = Date.now()
	let elapsed = now - then
	if (elapsed > FPS_INTERVAL) {
		then = now - (elapsed % FPS_INTERVAL)
		game.update()
		game.draw(ctx)
	}
}
gameLoop()


