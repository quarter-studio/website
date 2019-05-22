'use strict';(function(){var a=document.querySelector(".shader");window.animation=((e,c)=>{var a=e.getContext("webgl"),d=twgl.createBufferInfoFromArrays(a,c.buffer);e=c.fs;for(var b in c.options)e=e.replace("#endif",`#endif\nuniform float u_${b};\n`);var g={...c.textures};for(b in g){var f=g[b]={...g[b]};f.mag&&(f.mag=a[f.mag])}g=twgl.createTextures(a,g);var l=twgl.createProgramInfo(a,[c.vs,e]);a.useProgram(l.program);twgl.setBuffersAndAttributes(a,l,d);var h={u_time:0,u_mouse:[0,0]},k={_uniforms:h,
enabled:!0,options:Object.keys(c.options),render:()=>{k.enabled&&(twgl.setUniforms(l,h),twgl.drawBufferInfo(a,d))},get:a=>h[`u_${a}`],set:(a,e)=>{h[`u_${a}`]=e}};for(b in c.textures)k.set(b,g[b]);for(b in c.options)k.set(b,c.options[b]);return k})(a,{fs:"\n#ifdef GL_ES\nprecision mediump float;\n#endif\nuniform vec2 u_resolution;\nuniform vec2 u_mouse;\nuniform float u_time;\nuniform sampler2D u_texture;\nuniform sampler2D u_terrain;\nfloat random(vec2 st) {\n  float a = 12.9898;\n  float b = 78.233;\n  float c = 43758.5453;\n  float dt= dot(st.xy ,vec2(a,b));\n  float sn= mod(dt,3.14);\n  return fract(sin(sn) * c);\n}\nvec2 hash(vec2 p){  p = vec2( dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)) );\n  return -1.0 + 2.0*fract(sin(p)*43758.5453123);\n}\nfloat snoise(in vec2 p){\n  const float K1 = 0.366025404;  const float K2 = 0.211324865;\n  vec2  i = floor( p + (p.x+p.y)*K1 );\n  vec2  a = p - i + (i.x+i.y)*K2;\n  float m = step(a.y,a.x);\n  vec2  o = vec2(m,1.0-m);\n  vec2  b = a - o + K2;\n  vec2  c = a - 1.0 + 2.0*K2;\n  o.x = 1.0-o.y;\n  vec3  h = max( 0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );\n  vec3  n = h*h*h*h*vec3( dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));\n  return dot( n, vec3(u_dither*200.) );\n}\nconst float STEPS = 2.;\nconst float LINE_WIDTH = 0.002;\nconst float CUTOFF = 0.4;\nfloat ZOOM = 0.5;\nfloat posX = u_mouse.x * 0.1;\nfloat posY = u_mouse.y * 0.1;\nvec2 mouseUV = u_mouse / u_resolution;\nvec3 hsv2rgb(vec3 c){\n  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n}\nfloat getNoise(vec2 uv, float t){\n  float SCALEX = 1. * ZOOM;\n  float SCALEY = 2. * ZOOM * posY * 10.;\n  float noise = snoise( vec2(uv.x * SCALEX + posX + t, (uv.y * SCALEY + t)));\n  float SCALE = 1.;\n  noise += snoise( vec2((uv.x + posX + t/10000.) * 2., (uv.y + t/10000.) * 2.)) * 0.5 ;\n  noise = (noise/2. + 0.5);\n  return noise;\n}\nfloat getDepth(float n){\n  float d = (n - u_size) / (1. - u_size);\n  d = floor(d*STEPS)/STEPS;\n  return d;\n}\nvoid main(){\n  float t = u_time * 0.1 * u_viscosity;\n  vec2 uv = gl_FragCoord.xy / u_resolution.xy;\n  vec3 col = vec3(0);\n  float staticNoise = (texture2D(u_texture, uv * u_resolution.x / 256. + u_time * 0.1).r - 0.5) * .1;\n  float noise = getNoise(uv, t);\n  float d = getDepth(noise);\n  float h = 0.5;  float s = 0.;\n  float v = 0.;\n  float offX = u_blur_x*0.05 - 0.025;\n  float offY = u_blur_y*0.05 - 0.025;\n  float WIDEN = 1. + (sin(t)+1.)/2. * 1.5;\n  const int STEPS = 15;\n  for (int j=0; j<STEPS; j++){\n    vec2 dOffset = vec2(\n      getDepth(getNoise(uv + vec2(offX, offY) * WIDEN * pow(float(j), 1.25), t)),\n      getDepth(getNoise(uv + vec2(-offX, -offY) * WIDEN * pow(float(j), 1.25), t))\n    );\n    if (d != dOffset.x || d != dOffset.y){\n      h = 0.;      s = 0.;\n      v += u_gamma * 0.2 * floor( snoise( vec2(uv.x + t/50. + posX/50., uv.y ) * 512.) + (0.25 * float(STEPS)/float(j+1)) );\n      if (d != dOffset.x){\n        v *= u_edge*2.0;\n      }\n    }\n  }\n  col = hsv2rgb(vec3(h,s,v));\n  col += staticNoise;\n  gl_FragColor = vec4(col, 1.0);\n}",
vs:"attribute vec4 position;\nvoid main() {\n  gl_Position = position;\n}",buffer:{position:[-1,-1,0,1,-1,0,-1,1,0,-1,1,0,1,-1,0,1,1,0]},textures:{noise:{mag:"NEAREST",src:"/images/noise.png"},terrain:{src:"/images/terrain.png"}},options:{blur_x:.5,blur_y:.55,dither:.3,size:.3,edge:.425,gamma:.3,viscosity:.15}});var d=()=>{twgl.resizeCanvasToDisplaySize(a);a.getContext("webgl").viewport(0,0,a.width,a.height);animation.set("resolution",[a.width,a.height])};window.addEventListener("resize",d);d();d=
()=>{animation.enabled=window.pageYOffset<1.15*window.innerHeight};window.addEventListener("scroll",d);d();var m=a=>{animation.set("time",.001*a);animation.render();requestAnimationFrame(m)};m(0);var f=a=>{192===a.keyCode&&(a=document.createElement("script"),a.src="/scripts/editor.js",a.onload=void 0,document.body.appendChild(a),window.removeEventListener("keydown",f))};window.addEventListener("keydown",f);f({keyCode:192})})();
//# sourceMappingURL=main.js.map
