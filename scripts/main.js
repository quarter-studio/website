import noise from './shaders/noise.js'
import shader from './shader.js'
import { load } from './support.js';
import '../styles/main.sass'

var canvas = document.querySelector('.shader')

window.animation = shader(canvas, noise)

// resize the canvas
var resize = () => {
  twgl.resizeCanvasToDisplaySize(canvas);
  canvas.getContext('webgl').viewport(0, 0, canvas.width, canvas.height);
  animation.set('resolution', [canvas.width, canvas.height])
}

window.addEventListener('resize', resize)

resize()

// turn off rendering if off screen
var scroll = () => {
  return animation.enabled = window.pageYOffset < window.innerHeight * 1.15;
}

window.addEventListener('scroll', scroll)

scroll()

// update data by frame
var render = (time) => {
  animation.set('time', time * 0.001)
  animation.render()
  requestAnimationFrame(render)
}

render(0)

// load editor with tilde key
var keydown = (event) => {
  if (event.keyCode !== 192) return;

  load('/scripts/editor.js')

  window.removeEventListener('keydown', keydown)
}

window.addEventListener('keydown', keydown)

keydown({ keyCode: 192 })
