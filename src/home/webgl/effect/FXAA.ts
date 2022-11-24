import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'

class FXAA {
	public pass: ShaderPass

	constructor() {
		this.pass = this.createPass()
	}

	private createPass() {
		return new ShaderPass(FXAAShader)
	}

	update(width: number, height: number) {
		this.pass.material.uniforms.resolution.value.set(1 / width, 1 / height)
	}
}

export const fxaa = new FXAA()
