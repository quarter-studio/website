import config from '../config.js';
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

  uniforms.u_test_a = config.get('_testA');
  uniforms.u_test_b = config.get('_testB');
  uniforms.u_gradient = config.get('gradient');
  uniforms.u_gradient_ramp = config.get('gradientRamp');
  uniforms.u_gradient_dither = config.get('gradientDither');
  uniforms.u_gradient_size = config.get('gradientSize');
  uniforms.u_line_thickness = config.get('lineThickness');
  uniforms.u_noise_scale = config.get('noise');
  // uniforms.u_time = Math.sin(time / 30000); // use to slow time up or down
  uniforms.u_depth = config.get('depth'); // Math.sin(time/200) * 100; // 70 // wobbly mountains
  uniforms.u_lightPos = [0, 200, 0]; //origin of spotlight
  uniforms.u_lightColor = [0, 0, 0]; // color of spotlight in RGB
  uniforms.u_ambientLightColor = [1, 1, 1], // ambient light color in RGB
  uniforms.u_ambientIntensity = config.get('ambience'); // ambient light intensity [0...1]
  uniforms.u_specularIntensity = 0.5; // specular intensity of spotlight [0...1]
  uniforms.u_scale = config.get('scale'); // scale of the simplex noise
  uniforms.u_seed = config.get('seed');

  twgl.setUniforms(shader, uniforms);
  twgl.drawBufferInfo(webgl, webgl.TRIANGLE_STRIP, buffers);
}

var windDirection = 0
var windRadius = 0
var windTheta = 0
var windSpeed = 0

function animateWind (elapseTime, deltaTime) {
  
  var outer = config.get('windInfluenceOuter');
  var inner = config.get('windInfluenceInner');
  var min = config.get('windSpeedMin');
  var max = config.get('windSpeedMax');

  var theta = windTheta - windDirection;
  var radius = Math.max(0, windRadius - inner);
  radius = Math.min(1, radius / (outer - inner));
  radius = min + (max - min) * radius;

  windDirection += theta * config.get('windDirectionEase');
  windSpeed += (radius - windSpeed) * config.get('windSpeedEase');

  if (theta > Math.PI) {
    windDirection += 2 * Math.PI;
  } else if (theta < -Math.PI) {
    windDirection -= 2 * Math.PI;
  }

  uniforms.u_offset[0] += windSpeed * Math.cos(windDirection) * .000001;
  uniforms.u_offset[1] += windSpeed * Math.sin(windDirection) * .000001;
}

function mouseMove (event) {
  var radius = Math.hypot(window.innerWidth / 2, window.innerHeight / 2);
  var x = event.clientX - window.innerWidth / 2;
  var y = event.clientY - window.innerHeight / 2;
  windRadius = Math.hypot(x, y) / radius;
  windTheta = Math.atan2(y, x);
}

if (isMobileDevice) {

} else {
  window.addEventListener('mousemove', mouseMove);
}

if (!Math.hypot) {
  Math.hypot = function() {
    var y = 0, i = arguments.length;
    while (i--) y += arguments[i] * arguments[i];
    return Math.sqrt(y);
  };
}