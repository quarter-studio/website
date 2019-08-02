<script>
  // Vendor
  import {
    createBufferInfoFromArrays,
    createProgramInfo,
    createTextures,
    drawBufferInfo,
    m4,
    setBuffersAndAttributes,
    setUniforms,
  } from 'twgl.js';

  // Project
  import Camera from './primitives/Camera.js';
  import Plane from './primitives/Plane.js';
  import Webgl from '@/support/views/Webgl.vue';
  import Noise from './shaders/Noise.js';
  import noise from '@/assets/images/noise.png';
  import Wind from './Wind.js'

  // Component
  export default {
    components: {
      Webgl,
    },

    computed: {
      config () {
        return this.$store.getters['animation/config'].config
      }
    },

    watch: {
      config: {
        handler: 'configure',
        deep: true,
      },
    },

    created () {
      this.blow = Wind()
      
      this.uniforms = {
        model: m4.identity(),
        u_offset: [0, 0],
        u_mouse: [0, 0.5],
        u_lightPos: [0, 200, 0],
        u_lightColor: [0, 0, 0],
        u_specularIntensity: 0.5,
        u_ambientLightColor: [1, 1, 1],
      };

      this.configure();
    },

    methods: {
      configure () {
        const config = this.$store.getters['animation/get'];

        const uniforms = {
          u_noise_scale: config('noise'),
          u_line_thickness: config('lineThickness'),
          u_ambientIntensity: config('ambience'),
          u_gradient_dither: config('gradientDither'),
          u_gradient_ramp: config('gradientRamp'),
          u_gradient_size: config('gradientSize'),
          u_gradient: config('gradient'),
          u_density: config('density'),
          u_depth: config('depth'),
          u_scale: config('scale'),
          u_seed: config('seed'),
        };

        Object.assign(this.uniforms, uniforms);

        this.fieldOfView = config('zoom') * Math.PI / config('fov');
        this.project();

        this.wind = {
          direction: {
            ease: config('windDirectionEase')
          },
          influence: {
            inner: config('windInfluenceInner'),
            outer: config('windInfluenceOuter'),
          },
          speed: {
            ease: config('windSpeedEase'),
            min: config('windSpeedMin'),
            max: config('windSpeedMax'),
          }
        }
      },

      init (webgl) {
        var camera = Camera();
        this.uniforms.view = m4.inverse(camera);

        var textures = {
          noise: {
            mag: webgl.LINEAR,
            src: noise,
          },
        };

        this.textures = createTextures(webgl, textures);
        this.uniforms.u_noise = this.textures.noise;

        this.programInfo = createProgramInfo(webgl, Noise);

        webgl.useProgram(this.programInfo.program);
        webgl.clearColor(0, 0, 0, 1);
        webgl.frontFace(webgl.CW);
      },

      project () {
        const projection = m4.perspective(this.fieldOfView, this.aspectRatio, 1, 10000);

        this.uniforms.projection = projection
      },

      resize (webgl) {
        var canvas = webgl.canvas;
        this.uniforms.u_resolution = [
          canvas.width,
          canvas.height,
        ];

        this.aspectRatio = canvas.width / canvas.height;
        this.project();

        var plane = Plane(this.aspectRatio);
        this.buffers = createBufferInfoFromArrays(webgl, plane);

        setBuffersAndAttributes(webgl, this.programInfo, this.buffers);
      },

      update (webgl) {
        var wind = this.$store.state.mouseGraph;
        this.uniforms.u_offset = this.blow(this.wind, wind.radius, wind.theta);

        setUniforms(this.programInfo, this.uniforms);
        drawBufferInfo(webgl, this.buffers, webgl.TRIANGLE_STRIP);
      },
    },
  };
</script>

<template>
  <webgl id="animation" @init="init" @resize="resize" @update="update"/>
</template>
