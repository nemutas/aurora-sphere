varying vec2 v_uv;
uniform sampler2D tDiffuse;
uniform vec2 lightPosition;
uniform float exposure;
uniform float decay;
uniform float density;
uniform float weight;
uniform int samples;

const int MAX_SAMPLES = 100;

void main() {
  vec2 texCoord = v_uv;
  vec2 deltaTextCoord = texCoord - lightPosition;
  deltaTextCoord *= 1.0 / float(samples) * density;
  vec4 color = texture2D(tDiffuse, texCoord);
  float illuminationDecay = 1.0;

  for(int i=0; i < MAX_SAMPLES; i++) {
    if(i == samples) break;
    texCoord -= deltaTextCoord;
    vec4 tex = texture2D(tDiffuse, texCoord);
    tex *= illuminationDecay * weight;
    color += tex;
    illuminationDecay *= decay;
  }

  gl_FragColor = color * exposure;
}