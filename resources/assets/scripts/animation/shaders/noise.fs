// Author: Tobias Toft
// Title: Mountain ridges for Quarter Studio, v. 0.0.2
precision mediump float;
uniform mat4 view;
uniform vec3 u_lightPos;
uniform float u_ambientIntensity;
uniform float u_specularIntensity;
uniform vec3 u_ambientLightColor;
uniform vec3 u_lightColor;
uniform vec2 u_resolution;
uniform sampler2D u_noise;
uniform float u_depth;
uniform vec2 u_mouse;
varying vec3 v_normal;
varying vec3 v_fragPos;
varying vec2 v_texCoord;

float whiteNoise(in vec2 p){
  vec2 tv = p * u_resolution / 256.;
  return texture2D(u_noise, tv).r;
}

vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
vec3 hsv2rgb(vec3 c){
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float getDepth(float n, float cutoff, float steps){
  float d = (n-cutoff)/(1.-cutoff);
  d = floor(d*steps)/steps;
  return d;
}

float mapRange(float val, float low1, float high1, float low2, float high2){
  return low2 + (val - low1) * (high2 - low2) / (high1 - low1);
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float yPos = v_fragPos.y / u_depth; //y position in 0..1 range
  vec3 lightColor = u_lightColor;
  vec3 ambientLightColor = u_ambientLightColor;

  // Slice hills into layers
  const int steps = 3; //number of layers
  const int offset = 0; //start counting n layers with an offset

  // Set pixel color
  float h = 0.0;
  float s = 0.0;
  float v = 0.0;

  float d = getDepth(yPos, 0.0, float(steps));
  float thickness = 0.08; //for making simple gradients

  for (int i = offset; i<steps; i++){
    float value = float(i) / float(steps);

    if (yPos <= value && yPos > value - thickness){
      v += mapRange(yPos, value - thickness, value, 0.0, 0.7);

    }

    if (yPos <= value && yPos > value - 0.003) {
      v = 1.;
    }
  }

  v *= floor((whiteNoise(uv) * v) + .85);
  v += floor( (whiteNoise(uv * 3.) + .4) * floor(v + .9) );
  v = clamp(v, 0., 1.);

  // Add lighting
  vec3 ambience = u_ambientIntensity * ambientLightColor;
  vec3 lightPos = u_lightPos;
  vec3 normalized = normalize(v_normal);
  vec3 lightDirection = normalize(lightPos - v_fragPos);
  vec3 diffuse = max(dot(normalized, lightDirection), 0.) * lightColor;

  vec3 position = vec3(-u_mouse.x * u_resolution.x/5., -500.0, u_mouse.y * u_resolution.y/5.); //set light origin
  vec3 viewDirection = normalize(position - v_fragPos);
  vec3 reflectionDirection = reflect(-lightDirection, normalized);

  float spec = pow(max(dot(viewDirection, reflectionDirection), 0.0), 4.);
  vec3 specular = u_specularIntensity * spec * lightColor;

  vec3 lighting = diffuse + ambience + specular;

  // Set diffuse color
  vec3 diffuseColor = hsv2rgb(vec3(h, s, v));
  vec3 col = diffuseColor * lighting; //add lighting

  // Post-lighting noise
  // Add noise and clamp values
  //col = floor((whiteNoise(uv) * v) + col + 0.4); //mono noise
  //col *= floor((whiteNoise(uv) * v) + 0.85); //grey noise
  //col +=  (whiteNoise(uv * 3.) + 0.4) * floor(col + 0.8) * 0.2; //second layer
  //col = clamp(col, 0.0, 1.0);

  // Add vertical gradient
  col *= 0.35 + uv.y * 0.65;

  vec4 finalColor = vec4(col, 1.0);
  //finalColor += vec4(1.0, (1.-yPos), (1.-yPos) * 0.4, 1.0); //debug override
  gl_FragColor = finalColor;
}