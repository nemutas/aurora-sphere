uniform float u_time;
varying vec3 v_normal;
varying vec3 v_eye;

#include '../glsl/noise.glsl'
#include '../glsl/math.glsl'

vec3 displace(vec3 v) {
  vec2 r = rotate2d(v.xy, cnoise31(v + u_time * 0.5));
  return v + normal * cnoise31(v * 0.5 + vec3(r, v.z) + u_time) * 0.1;
}

#include '../glsl/recalcNormal.glsl'

void main() {
  vec3 pos = displace(position);
  vec3 norm = recalcNormal(pos);

  v_normal = normalize(normalMatrix * norm);
  v_eye = normalize(modelViewMatrix * vec4( pos, 1.0 )).xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}