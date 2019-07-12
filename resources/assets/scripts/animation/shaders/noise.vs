precision highp float;
attribute mediump vec2 texcoord;
attribute mediump vec3 position;
attribute mediump vec3 normals;
uniform mediump float u_knob;
uniform mediump float u_scale;
uniform mediump float u_depth;
uniform mediump float u_time;
uniform mediump float u_seed;
uniform mediump mat4 projection;
uniform mediump mat4 model;
uniform mediump mat4 view;
uniform mediump vec2 u_resolution;
uniform mediump vec2 u_direction;
uniform mediump vec2 u_offset;
varying mediump vec2 v_texCoord;
varying mediump vec3 v_fragPos;
varying mediump vec3 v_normal;

const vec4 C = vec4(
  0.211324865405187,
  0.366025403784439,
  -0.577350269189626,
  0.024390243902439
);

vec3 mod289 (vec3 x) {
  return x - floor(x * (1. / 289.)) * 289.;
}

vec3 permute (vec3 x) {
  return mod289(((x*34.)+1.)*x);
}

float snoise (vec2 v) {
  // First corner
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);

  // Other corners
  vec2 i1 = x0.x > x0.y ? vec2(1., 0.) : vec2(0., 1.);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  // Permutations
  i = i - floor(i * (1. / 289.)) * 289.; // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;

  // Gradients: 41 points uniformly over a line, mapped onto a diamond.
  // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  // Normalise gradients implicitly by scaling m
  // Approximation of: m *= inversesqrt( a0*a0 + h*h );
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

  // Compute final noise value at P
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

//--- End of Ashima Simplex noise

void main () {
  float aspect = u_resolution.x / u_resolution.y;

  vec2 uv = position.xz / u_resolution;

  vec2 scale = vec2(5. * aspect * 1. / u_scale, 5. * 1. / u_scale);

  vec2 offset = u_offset;
  // vec2 direction = u_direction * u_time;
  // vec2 direction = vec2(u_direction.x * u_time, u_direction.y * u_time);

  vec4 movement = vec4(position, 1.);
  
  float noise1 = snoise( u_seed + vec2(uv.x * scale.x + offset.x, uv.y * scale.y + offset.y ));
  float noise2 = snoise( u_seed + vec2(uv.x * scale.x + offset.x, uv.y * scale.y + offset.y / 3. ) * 3.); //wobbles

  movement.y = mix(noise1, noise2, 0.2) * u_depth;

  v_normal = normals;
  v_fragPos = vec3(model * movement);
  v_texCoord = texcoord;
  gl_Position = projection * view * model * movement;
}