import { registPageInstance } from '../scripts/utils'
import { Page } from '../types/types'
import { TCanvas } from './webgl/TCanvas'

class Home implements Page {
	private canvas: TCanvas

	constructor() {
		this.canvas = new TCanvas(document.body)
	}

	dispose() {
		this.canvas.dispose()
	}
}

registPageInstance(new Home())
