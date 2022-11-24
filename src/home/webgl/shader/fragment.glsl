uniform vec3 u_light;
varying vec3 v_normal;
varying vec3 v_eye;

#include '../glsl/fresnel.glsl'

void main() {
  vec3 color = v_normal + 1.0;

  float f = fresnel(v_eye, v_normal);
  color *= f;

  float strength = dot(normalize(u_light), v_normal);
  color *= strength * 0.5;

  gl_FragColor = vec4(color, 1);
  // gl_FragColor = vec4(vec3(f), 1.0);
  // gl_FragColor = vec4(vec3(strength), 1.0);
}