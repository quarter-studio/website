import '../styles/all.scss'
import fs from './shaders/ashima.fs'
import vs from './shaders/ashima.vs'

// get mouse position for GL uniform
function getRelativeMousePosition(event, target) {
  target = target || event.target;
  var rect = target.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  }
}

// assumes target or event.target is canvas
function getNoPaddingNoBorderCanvasRelativeMousePosition(event, target) {
  target = target || event.target;
  var pos = getRelativeMousePosition(event, target);

  pos.x = pos.x * target.width  / target.clientWidth;
  pos.y = pos.y * target.height / target.clientHeight;

  return pos;
}

// init webgl
let top = 0
const mousePos = {x: 0, y: 0};
const arrays = {
  position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
};

const canvas = document.querySelector(".shader");
const gl = canvas.getContext("webgl");
const programInfo = twgl.createProgramInfo(gl, [vs, fs]);
const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
const textures = twgl.createTextures(gl, {
  noise: { src: "/images/noise.png", mag: gl.NEAREST },
  ashima1: { src: "/images/ashima1.png" },
  ashima2: { src: "/images/ashima2.png" }
});

gl.useProgram(programInfo.program);
twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);

window.uniforms = {
  u_texture: textures.noise,
  u_ashima1: textures.ashima1,
  u_ashima2: textures.ashima2,
  // u_option_knob: 0.5,
  // u_option_size: 0.5,
  // u_option_layers: 0.16,
  // u_option_stroke: 0.2,
  // u_option_spread: 0.1,
  // u_option_fade: 0.625,
  // u_option_edge: 0.6875,
  // u_option_noise: 0.2,
  // u_option_noise_size: 0.5,
  // u_option_speed: 0.05,
  // u_option_blend: 0.05,
};

function render(time) {
  requestAnimationFrame(render);

  if (top > canvas.height) return;

  uniforms.u_time = time;

  twgl.setUniforms(programInfo, uniforms);
  twgl.drawBufferInfo(gl, bufferInfo);
}

requestAnimationFrame(render);

// attach listener for resizing the canvas
function resize() {
  canvas.width  = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  uniforms.u_resolution = [canvas.width, canvas.height];
  twgl.resizeCanvasToDisplaySize(canvas, 1); //use window.devicePixelRatio if you want retina, we might not though...
  gl.viewport(0, 0, canvas.width, canvas.height);
}

resize();

window.addEventListener('resize', resize);

// attach listener for updating mouse position uniform
function mousemove (e) {
  const pos = getNoPaddingNoBorderCanvasRelativeMousePosition(e, canvas);
  // pos is in pixel coordinates for the canvas.
  // so convert to WebGL clip space coordinates
  const x = pos.x / canvas.width  *  2 - 1;
  const y = pos.y / canvas.height * -2 + 1;

  mousePos.x = -0.02; // x;
  mousePos.y = 0.015; // y;

  uniforms.u_mouse = [mousePos.x, mousePos.y];
}

window.addEventListener('mousemove', mousemove);

// attach listener for disable render on scroll
function scroll (e) {
  var doc = document.documentElement; //IE with doctype
  doc = doc.clientHeight ? doc : document.body;
  top = doc.scrollTop
}

window.addEventListener('scroll', scroll)

// attach listener for loading the editor with the tilde key
// function keydown (e) {
//   if (e.keyCode === 192) {
//     var script = document.createElement('script')
//     script.src = '/scripts/editor.js'
//     document.body.appendChild(script)
//     window.removeEventListener('keydown', keydown)
//   }
// }

// window.addEventListener('keydown', keydown)