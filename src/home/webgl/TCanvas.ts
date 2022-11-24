import * as THREE from 'three'
import { TCanvasBase } from './TCanvasBase'
import vertexShader from './shader/vertex.glsl'
import fragmentShader from './shader/fragment.glsl'
import { Effects } from './effect/Effects'
import { mouse2d } from './mouse2d'

export class TCanvas extends TCanvasBase {
	private effects!: Effects

	constructor(parentNode: ParentNode) {
		super(parentNode)

		this.setScene()
		this.createSphere()
		this.setResize()
		this.animate(this.update, false)
	}

	private setScene() {
		this.scene.background = new THREE.Color('#000')
		this.scene.userData.scale = { pc: 1, sp: 0.7 }
		this.calcSceneScale()
		this.camera.position.z = 5

		this.effects = new Effects(this.renderer, this.scene, this.camera)
	}

	private createSphere() {
		const geometry = new THREE.IcosahedronGeometry(1, 32)
		const material = new THREE.ShaderMaterial({
			uniforms: {
				u_time: { value: 0 },
				u_light: { value: new THREE.Vector3(-1, 1, 0) },
			},
			vertexShader,
			fragmentShader,
		})
		const mesh = new THREE.Mesh(geometry, material)
		mesh.name = 'sphere'
		this.scene.add(mesh)
	}

	private calcSceneScale() {
		const ratio = THREE.MathUtils.smoothstep(this.size.aspect, 0.5, 1)
		const scale = THREE.MathUtils.lerp(this.scene.userData.scale.sp, this.scene.userData.scale.pc, ratio)
		this.scene.scale.set(scale, scale, scale)
	}

	private setResize() {
		this.resizeCallback = () => {
			this.calcSceneScale()
			this.effects.resize()
		}
	}

	private update = () => {
		const dt = this.clock.getDelta()

		const sphere = this.getMesh<THREE.ShaderMaterial>('sphere')
		sphere.material.uniforms.u_time.value += dt

		const light = sphere.material.uniforms.u_light.value
		light.x = THREE.MathUtils.lerp(light.x, mouse2d.position[0], 0.1)
		light.y = THREE.MathUtils.lerp(light.y, mouse2d.position[1], 0.1)

		this.effects.render()
	}
}
