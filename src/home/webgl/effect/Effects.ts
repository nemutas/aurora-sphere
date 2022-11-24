import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { fxaa } from './FXAA'
import { volumetricLight } from './VolumetricLight'

export class Effects {
	private composer!: EffectComposer

	constructor(private gl: THREE.WebGLRenderer, private scene: THREE.Scene, private camera: THREE.Camera) {
		this.init()
	}

	private init() {
		this.composer = new EffectComposer(this.gl)
		this.composer.addPass(new RenderPass(this.scene, this.camera))

		this.composer.addPass(fxaa.pass)
		this.composer.addPass(volumetricLight.pass)

		fxaa.update(this.size.width, this.size.height)
	}

	private get size() {
		return { width: window.innerWidth, height: window.innerHeight, aspect: window.innerWidth / window.innerHeight }
	}

	resize() {
		const { width, height } = this.size
		fxaa.update(width, height)
		this.composer.setSize(width, height)
	}

	render() {
		this.composer.render()
	}
}
