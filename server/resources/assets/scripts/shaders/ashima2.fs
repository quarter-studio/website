// Author: Tobias Toft
// Title: Mountain ridges for Quarter Studio, v. 0.0.1
// Heavily inspired by and based on the 'noise holes' shader found here: https://www.shadertoy.com/view/XdyXz3

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_option_knob;
uniform float u_option_layers;
uniform float u_option_stroke;
uniform float u_option_spread;
uniform float u_option_fade;
uniform float u_option_edge;
uniform float u_option_noise;
uniform float u_option_noise_size;
uniform float u_option_size;
uniform float u_option_speed;
uniform float u_option_blend;
uniform sampler2D u_texture;
uniform sampler2D u_ashima1;
uniform sampler2D u_ashima2;

const int LAYERS = 100;
const vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);

int layers = int(float(LAYERS) * u_option_layers);
float speed = 0.0001 * u_option_speed;
float time = u_time * speed;
float spread = (10. * u_option_spread) + (sin(time) + 1.) / 2. * 1.5;
float stroke = 0.01 * u_option_stroke;
float size = 1. - u_option_size;
float fade = 2. * u_option_fade;
float edge = u_option_edge * 4. - 2.;
float noise = u_option_noise;
float noiseSize = 4. * (1. - u_option_noise_size);
float blend = u_option_blend;

mat2 rotation;
vec2 scale = vec2(1., 1.);
vec2 offsetX = vec2(0, stroke);
vec2 offsetY = vec2(0, -stroke);
vec2 position = u_mouse * 0.1;
vec2 resolution = u_resolution / 2048.;

float getWhiteNoise(in vec2 p) {
  return texture2D(u_texture, p * u_resolution / 256.).r;
}

float snoise (in vec2 p) {
  return texture2D(u_ashima1, p * resolution).r;
}

vec3 hsvToRgb (vec3 color) {
  vec3 p = abs(fract(color.xxx + K.xyz) * 6.0 - K.www);
  return color.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), color.y);
}

mat2 rotate2d(float a){
  return mat2(
    cos(a), -sin(a),
    sin(a), cos(a)
  );
}

float getNoise(vec2 uv){
  return snoise(
    rotation * (uv * scale + position + time)
  );
}

float getDepth (float value){
  return floor((value - size) / (1. - size));
}

float getNoiseDepth (vec2 value) {
  return getDepth(
    getNoise(value)
  );
}

void main(){
  rotation = rotate2d(sin(time * 0.1) + position.y * 2.);
  // rotation = rotate2d(sin(time * 0.1) + 9.);
  // rotation = rotate2d(
  //   sin(time * 2.)
  // );

  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec3 color = vec3(0.5, 0., 0.);
  float depth = getNoiseDepth(uv);
  float whiteNoise = getWhiteNoise(uv * noiseSize);
  
  for (int layer = 0; layer < LAYERS; layer++) {
    if (layer > layers) {
      break;
    }

    float change = spread * pow(float(layer), fade);

    vec2 offset = vec2(
      getNoiseDepth(uv + offsetX * change),
      getNoiseDepth(uv + offsetY * change)
    );

    if (depth == offset.x && depth == offset.y) {
      continue;
    }

    color[0] = 0.;
    color[2] += .0625 * floor(whiteNoise + noise * float(layers / layer));

    if (depth == offset.x){
      continue;
    }

    color[2] *= edge;
  }

  color = hsvToRgb(color);
  color *= blend + (gl_FragCoord.y / u_resolution.y) * (1. - blend);

  gl_FragColor = vec4(color, 1.0);
}