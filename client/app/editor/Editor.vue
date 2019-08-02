<script>
  // import defaultsDeep from 'lodash/defaultsDeep'
  // import database from '@/support/firebase/database.js'
  // import includes from 'lodash/includes'
  // import config from '@/store/config.js'
  // import slider from './Slider.vue'
  // import merge from 'lodash/merge'
  // import pick from 'lodash/pick'
  // import map from 'lodash/mapValues'
  // import env from '@/env.js'
  // import Vue from 'vue'

  // Vendor
  import omitBy from 'lodash/omitBy'

  // Project
  import Slider from './Slider.vue';

  // Component
  export default {
    components: {
      Slider,
    },

    computed: {
      config () {
        return this.$store.getters['animation/config'];
      },

      options () {
        return omitBy(this.config.config, this.isValidOption);
      },
    },

    methods: {
      isValidOption (option) {
        return !option.name
      },

      create () {
        // this.selection = this.model.push({
        //   name: 'Untitled',
        //   config: config.default()
        // }).key
      },

      copy () {
        // this.selection = this.model.push(
        //   this.configs[this.selection]
        // ).key
      },

      save () {
        // this.model.child(this.selection).child('config').set(
        //   map(this.config, this.map)
        // )
      },

      map (value) {
        return pick(value, ['min', 'max', 'value'])
      },

      rename () {
        // if (this.name) {
        //   this.model.child(this.selection).child('name').set(this.name)
        //   this.blur()
        // } else {
        //   this.name = this.configs[this.selection].name
        // }
      },

      destroy () {
        // this.model.child(this.selection).set(null)
      },

      blur () {
        // this.name = null
      },

      keydown (event) {
        // if (event.metaKey && event.keyCode === 83) {
        //   this.save()
        //   event.preventDefault()
        //   return false
        // }
      },

      close () {
        this.$store.commit('editor/close')
      },

      select (event) {
        var key = event.target.value;

        this.$store.commit('animation/use', key);
      }
    },
  };
</script>

<template>
  <div :class="['editor', $style.module]">
    <div :class="$style.bar">
      <span :class="$style.button" @click="close">close</span>
      <!-- <span :class="$style.spacer">|</span>
      <span :class="$style.button" @click="create">new</span>
      <template v-if="config">
        <span :class="$style.button" @click="copy">copy</span>
        <span :class="$style.button" @click="rename">rename</span>
        <span :class="$style.button" @click="save">save</span>
        <span :class="$style.button" @click="destroy">delete</span>
      </template> -->
    </div>

    <table>
      <!-- <tr>
        <td>Settings</td>
        <td>
          <select :class="$style.fill" :value="$store.state.animation.key" @input="select">
            <option disabled value="">Please select one</option>
            <option
              v-for="(config, key) in $store.state.animation.configs"
              v-text="config.name"
              :value="key"
              :key="key"
            />
          </select>
          
          <input type="text" v-model="name" :class="$style.fill" @keydown.enter="rename" @blur="blur">
        </td>
      </tr> -->

      <tr>
        <td></td>
        <td :class="$style.labels">
          <div>min</div>
          <div>value</div>
          <div>max</div>
        </td>
      </tr>

      <template>
        <slider
          v-for="(value, key) in options"
          v-bind="value"
          :key="key"
          :id="key"
        />
      </template>
    </table>
  </div>
</template>

<style module>
  .module {
    top: 0;
    left: 0;
    z-index: 10;
    padding: 10px;
    position: fixed;
    background: rgba(10,10,10,0.9);
    font-size: 12px;
    font-weight: 100;
  }

  .bar {
    margin-bottom: 1rem;
  }

  .spacer {
    margin: 0 0.5rem;
  }

  .button {
    cursor: pointer;
    padding: 4px;
  }

  .fill {
    width: 100%;
  }

  .labels {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1.1rem;
  }
</style>


