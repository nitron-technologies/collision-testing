class ControlOption {
	constructor(public left: number, public up: number, public right: number) {}
}
const CONTROL_OPTIONS = {
	wasd: new ControlOption(65, 87, 68),
	arrows: new ControlOption(37, 38, 39),
}

export class Controller {
	left = false
	right = false
	up = false
	direction: 'R' | 'L' = 'R'
	mapping: ControlOption
	constructor(keys: keyof typeof CONTROL_OPTIONS) {
		this.mapping = CONTROL_OPTIONS[keys]
		document.addEventListener('keydown', (event) => {
			switch (event.keyCode) {
				case this.mapping.left:
					this.left = true
					this.direction = 'L'
					break
				case this.mapping.up:
					this.up = true
					break
				case this.mapping.right:
					this.right = true
					this.direction = 'R'
					break
			}
		})
		document.addEventListener('keyup', (event) => {
			switch (event.keyCode) {
				case this.mapping.left:
					this.left = false
					if (this.right) this.direction = 'R'
					break
				case this.mapping.up:
					this.up = false
					break
				case this.mapping.right:
					this.right = false
					if (this.left) this.direction = 'L'
					break
			}
		})
	}
}
