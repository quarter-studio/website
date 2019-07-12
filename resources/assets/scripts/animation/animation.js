import config from '../editor/config.js';
import img from '../../images/noise.png';
import fs from './shaders/noise.fs';
import vs from './shaders/noise.vs';

requestAnimationFrame(render);

var canvas = document.getElementById('animation');
var webgl = canvas.getContext('webgl', { alpha: false });
var m4 = twgl.m4;

var isMobileDevice = window.orientation !== undefined || navigator.userAgent.indexOf('IEMobile') !== -1;
var aspectRatio = canvas.clientWidth / canvas.clientHeight;
var pixelRatio = isMobileDevice ? 1 : window.devicePixelRatio;
var vertices = 256;
var stretchX = 2.2;
var stretchY = 2.6;
let position = [];
let indices = [];
let normal = [];

for(let x = 0; x < vertices; x++) {
  for(let z = 0; z < vertices; z++) {
    position.push((x * aspectRatio * stretchX) - (vertices * stretchX * aspectRatio / 2));
    position.push(0);
    position.push((z * stretchY) - (vertices * stretchY / 2));
    normal.push(0, 0, 1);
  }
}

for (let z = 0; z < vertices - 1; z++) {
  if (z > 0) {
    indices.push(z * vertices);
  }

  for (let x = 0; x < vertices; x++) {
    indices.push(z * vertices + x);
    indices.push((z + 1) * vertices + x);
  }

  if (z < vertices - 2) {
    indices.push((z + 1) * vertices + vertices - 1);
  }
}

var buffers = twgl.createBufferInfoFromArrays(webgl, {
  position: { numComponents: 3, data: position },
  normal: { numComponents: 3, data: normal },
  indices: { numComponents: 1, data: indices }
});

var shader = twgl.createProgramInfo(webgl, [vs, fs]);
var textures = twgl.createTextures(webgl, {
  noise: { src: img, mag: webgl.LINEAR }
});

var target = [0, 0, 0];
var eye = [0, 500, -1];
var up = [0, 1, 0];
var camera = m4.lookAt(eye, target, up);

var elapseTime = 0

twgl.resizeCanvasToDisplaySize(canvas, pixelRatio);
twgl.setBuffersAndAttributes(webgl, shader, buffers);
webgl.useProgram(shader.program);
webgl.clearColor(0, 0, 0, 1);
webgl.frontFace(webgl.CW);
webgl.viewport(0, 0, canvas.width, canvas.height);

var uniforms = {
  view: m4.inverse(camera),
  model: m4.identity(),
  u_offset: [0, 0],
  u_mouse: [0, 0.5],
  u_noise: textures.noise,
  u_resolution: [canvas.width, canvas.height],
};

function render(time) {
  var deltaTime = (time - elapseTime);
  elapseTime = time;

  if (canvas.getBoundingClientRect().bottom) {
    animateWind(elapseTime, deltaTime);
    renderCanvas(elapseTime, deltaTime);
  }

  requestAnimationFrame(render);
}

function renderCanvas () {
  var fieldOfView = config.get('zoom') * Math.PI / config.get('fov');
  uniforms.projection = m4.perspective(fieldOfView, aspectRatio, 1, 10000);

  uniforms.u_knob = config.get('knob');
  uniforms.u_noise_scale = config.get('noise');
  // uniforms.u_time = Math.sin(time / 30000); // use to slow time up or down
  uniforms.u_depth = config.get('depth'); // Math.sin(time/200) * 100; // 70 // wobbly mountains
  uniforms.u_lightPos = [0, 200, 0]; //origin of spotlight
  uniforms.u_lightColor = [0, 0, config.get('knob')]; // color of spotlight in RGB
  uniforms.u_ambientLightColor = [1, 1, 1], // ambient light color in RGB
  uniforms.u_ambientIntensity = config.get('ambience'); // ambient light intensity [0...1]
  uniforms.u_specularIntensity = 0.5; // specular intensity of spotlight [0...1]
  uniforms.u_scale = config.get('scale'); // scale of the simplex noise
  uniforms.u_seed = config.get('seed');

  twgl.setUniforms(shader, uniforms);
  twgl.drawBufferInfo(webgl, webgl.TRIANGLE_STRIP, buffers);
}

var windRadiusGoal = 0
var windThetaGoal = 0
var windRadius = 0
var windTheta = 0
function animateWind (elapseTime, deltaTime) {
  var theta = windThetaGoal - windTheta;

  if (theta > Math.PI) {
    windTheta += 2 * Math.PI;
  } else if (theta < -Math.PI) {
    windTheta -= 2 * Math.PI;
  }

  windTheta += theta / 100;
  windRadius += (windRadiusGoal - windRadius) * config.get('windSpeedEasing');
  
  uniforms.u_offset[0] += windRadius * Math.cos(windTheta) * .000001;
  uniforms.u_offset[1] += windRadius * Math.sin(windTheta) * .000001;
}

window.addEventListener('mousemove', function (event) {
  var x = event.clientX - window.innerWidth / 2;
  var y = event.clientY - window.innerHeight / 2;
  windRadiusGoal = Math.max(100, Math.min(400, Math.hypot(x, y)));
  windThetaGoal = Math.atan2(y, x);
  // var bounds = canvas.getBoundingClientRect();
  // var x = (event.clientX - bounds.left) * canvas.width / canvas.clientWidth / canvas.width * 2 - 1;
  // var y = (event.clientY - bounds.top) * canvas.height / canvas.clientHeight / canvas.height * 2 - 1;
  // // uniforms.u_direction = [x, y];
  // uniforms.u_mouse = [x, y];
});

if (!Math.hypot) {
  Math.hypot = function() {
    var y = 0, i = arguments.length;
    while (i--) y += arguments[i] * arguments[i];
    return Math.sqrt(y);
  };
}