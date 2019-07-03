// Author: Tobias Toft
// Title: Mountain ridges for Quarter Studio, v. 0.0.1
// Heavily inspired by and based on the 'noise holes' shader found here: https://www.shadertoy.com/view/XdyXz3

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_texture;
uniform sampler2D u_ashima1;
uniform sampler2D u_ashima2;

// Generic random
float random(vec2 st) {
  float a = 12.9898;
  float b = 78.233;
  float c = 43758.5453;
  float dt= dot(st.xy ,vec2(a,b));
  float sn= mod(dt,3.14);
  return fract(sin(sn) * c);
}

float whiteNoise(in vec2 p){
  vec2 tv = p * vec2(u_resolution.x/256., u_resolution.y/256.); // * vec2(1.,float(u_resolution.y/u_resolution.x));
  return (texture2D(u_texture, tv).r);
}

// Perlin noise
float snoise(in vec2 p){
  vec2 tv = p * vec2(u_resolution.x/2048., u_resolution.y/2048.); // * vec2(1.,float(u_resolution.y/u_resolution.x));
  vec4 tex = texture2D(u_ashima1, tv);
  //float val = (tex.r + tex.g + tex.b)/3.;
  return tex.r;
}

// Perlin noise with two octaves
float snoise2(in vec2 p){
  vec2 tv = p * vec2(u_resolution.x/2048., u_resolution.y/2048.); // * vec2(1.,float(u_resolution.y/u_resolution.x));
  vec4 tex = texture2D(u_ashima2, tv);
  //float val = (tex.r + tex.g + tex.b)/3.;
  return tex.r;
}

//--

const float STEPS = 4.;
const float LINE_WIDTH = 0.002;
const float CUTOFF = 0.5;
float posX = u_mouse.x * 0.1;
float posY = u_mouse.y * 0.1;
vec2 mouseUV = u_mouse / u_resolution;


vec3 hsv2rgb(vec3 c){
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

mat2 rotate2d(float a){
  return mat2(
      cos(a), -sin(a),
      sin(a), cos(a)
  );
}

float getNoise(vec2 uv, float t){
  //given a uv coord and time - return a noise val in range 0 - 1
  //using baked ashima noise

  //octave 1
  const float SCALEX = 1.;
  const float SCALEY = 1.;
  //float noise = snoise( vec2(uv.x * SCALEX + posX + t, (uv.y * SCALEY + t)));
  float noise = snoise( rotate2d(sin(t*0.1) + posY * 2.) * vec2(uv.x * SCALEX + posX + t, uv.y * SCALEY + posY + t));

  //octave 2
  // NOTE: Disabling mixing two noise textures for now until I find a higher res/bitdepth way of doing it
  //noise += snoise2( vec2(uv.x * SCALEX + t, uv.y * SCALEY + t)) * 0.2 ;

  //move noise into 0 - 1 range
  //noise = (noise/2. + 0.5);

  return noise;
}

float getDepth(float n){
  //remap remaining non-cutoff region to 0 - 1
  //float cutoff = posY + 0.5;
  float d = (n - CUTOFF) / (1. - CUTOFF);

  //step
  d = floor(d*STEPS)/STEPS;

  return d;
}

void main(){
  float t = u_time * 0.00001;
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec3 col = vec3(0);

  float noise = getNoise(uv, t);
  float d = getDepth(noise);

  //calc HSV color
  float h = 0.5;// + (d * 0.3); //= d + 0.2; //rainbow hue
  float s = 0.;
  float v = 0.; //deeper is darker

  // //get depth at offset position (needed for outlining)
  // float noiseOffY = getNoise(uv + vec2(0, LINE_WIDTH), t);
  // float noiseOffX = getNoise(uv + vec2(LINE_WIDTH, 0), t);
  // float dOffY = getDepth(noiseOffY);
  // float dOffX = getDepth(noiseOffX);

  float WIDEN = 1. + (sin(t)+1.)/2. * 1.5;
  const int STEPS = 16;
  for (int j=0; j<STEPS; j++){
    vec2 dOffset = vec2(
      getDepth(getNoise(uv + vec2(0, LINE_WIDTH) * WIDEN * pow(float(j), 1.25), t)),
      getDepth(getNoise(uv + vec2(0, -LINE_WIDTH) * WIDEN * pow(float(j), 1.25), t))
    );


    // // Save for later
    // vec4 dOffset = vec4(
    //   getDepth(getNoise(uv + vec2(LINE_WIDTH, 0) * WIDEN * pow(float(j), 1.25), t)),
    //   getDepth(getNoise(uv + vec2(0, LINE_WIDTH) * WIDEN * pow(float(j), 1.25), t)),
    //   getDepth(getNoise(uv + vec2(-LINE_WIDTH, 0) * WIDEN * pow(float(j), 1.25), t)),
    //   getDepth(getNoise(uv + vec2(0, -LINE_WIDTH) * WIDEN * pow(float(j), 1.25), t))
    // );


    if (d != dOffset.x || d != dOffset.y){
    //if (d != dOffset.x || d != dOffset.y || d != dOffset.z || d != dOffset.w){ // Save for later
      h = 0.; //(uv.x * 0.1) + 0.5;
      s = 0.;
      v += .0625 * floor( whiteNoise(uv*2.) + 0.2 * float(STEPS)/float(j+1)); // + (0.2 * float(STEPS)/float(j+1)) );
      if (d != dOffset.x){
        v *= 0.75;
      }
    }
  }

  // // // Outline ridges
  // if (d != dOffX || d != dOffY){
  //   h = (d * 0.1) + (sin(t) + 1.)/2.;
  //   s = .3;
  //   v = (sin(t)+1.)/2. + d + 0.5;
  //   //v *= 0.25;
  // }

  col = hsv2rgb(vec3(h,s,v));

  //add vertical gradient
  col *= 0.2 + (gl_FragCoord.y/u_resolution.y) * 0.8;

  //add noise texture
  //col += 0.1 * whiteNoise(uv + random(vec2(u_time, 0)));

  gl_FragColor = vec4(col, 1.0);
  //gl_FragColor = vec4(noise, noise, noise, 1.0);
}