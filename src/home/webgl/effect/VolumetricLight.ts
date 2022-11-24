import * as THREE from 'three'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import vertexShader from '../shader/volumetricLightVert.glsl'
import fragmentShader from '../shader/volumetricLightFrag.glsl'
import { gui } from '../gui'

class VolumetricLight {
	public pass: ShaderPass

	constructor() {
		this.pass = this.createPass()
		this.setGui()
	}

	private createPass() {
		const shader: THREE.Shader = {
			uniforms: {
				tDiffuse: { value: null },
				lightPosition: { value: new THREE.Vector2(0.5, 0.5) },
				exposure: { value: 1 },
				decay: { value: 0.95 },
				density: { value: 0.4 },
				weight: { value: 1 },
				samples: { value: 100 },
			},
			vertexShader,
			fragmentShader,
		}

		return new ShaderPass(shader)
	}

	private setGui() {
		const uniforms = this.pass.material.uniforms
		gui.add(this.pass, 'enabled')
		gui.add(uniforms.exposure, 'value', 0, 1, 0.01).name('exposure')
		gui.add(uniforms.decay, 'value', 0, 1, 0.01).name('decay')
		gui.add(uniforms.density, 'value', 0, 1, 0.01).name('density')
		gui.add(uniforms.weight, 'value', 0, 1, 0.01).name('weight')
		gui.add(uniforms.samples, 'value', 0, 100, 1).name('samples')
	}
}

export const volumetricLight = new VolumetricLight()
