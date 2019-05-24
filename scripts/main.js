import '../styles/all.scss'
// vertex shader
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

// resize canvas
function resize(canvas) {
  // Lookup the size the browser is displaying the canvas.
  var displayWidth  = canvas.clientWidth;
  var displayHeight = canvas.clientHeight;

  // Check if the canvas is not the same size.
  if (canvas.width  !== displayWidth ||
      canvas.height !== displayHeight) {

    // Make the canvas the same size
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
  }
}


// init webgl
let mousePos = {x: 0, y: 0};
const gl = document.querySelector(".shader").getContext("webgl");
const programInfo = twgl.createProgramInfo(gl, [vs, fs]);

const arrays = {
  position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
};

const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
const textures = twgl.createTextures(gl, {
  noise: { src: "/images/noise.png", mag: gl.NEAREST },
  ashima1: { src: "/images/ashima1.png" },
  ashima2: { src: "/images/ashima2.png" }
});

function render(time) {
  twgl.resizeCanvasToDisplaySize(gl.canvas, 1); //use window.devicePixelRatio if you want retina, we might not though...
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  const uniforms = {
    u_time: time * 0.001,
    u_resolution: [gl.canvas.width, gl.canvas.height],
    u_mouse: [mousePos.x, mousePos.y],
    u_texture: textures.noise,
    u_ashima1: textures.ashima1,
    u_ashima2: textures.ashima2
  };

  gl.useProgram(programInfo.program);
  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
  twgl.setUniforms(programInfo, uniforms);
  twgl.drawBufferInfo(gl, bufferInfo);

  requestAnimationFrame(render);
}

requestAnimationFrame(render);


// attach listener for updating mouse position uniform
window.addEventListener('mousemove', e => {
  const pos = getNoPaddingNoBorderCanvasRelativeMousePosition(e, gl.canvas);

  // pos is in pixel coordinates for the canvas.
  // so convert to WebGL clip space coordinates
  const x = pos.x / gl.canvas.width  *  2 - 1;
  const y = pos.y / gl.canvas.height * -2 + 1;

  mousePos.x = x;
  mousePos.y = y;
});