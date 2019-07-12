<script>
  import defaultsDeep from 'lodash/defaultsDeep'
  import database from '../firebase/database.js'
  import config from '../../config.js'
  import slider from './slider.vue'
  import merge from 'lodash/merge'
  import env from '../env.js'
  import Vue from 'vue'

  export default {
    name: 'Editor',

    components: {
      slider
    },

    data () {
      return {
        name: null,
        configs: {},
        visible: env.get('visible', true),
        selection: env.get('selection', null),
      }
    },
    
    computed: {
      config () {
        return (
          this.selection && 
          this.configs[this.selection] &&
          config.use(this.configs[this.selection].config)
        )
      }
    },

    watch: {
      visible (value) {
        env.set('visible', value)
      },

      selection (value) {
        env.set('selection', value)
      }
    },

    created () {
      this.model = database.ref('animation')
      this.model.on('child_added', this.add)
      this.model.on('child_removed', this.remove)
    },

    methods: {
      toggle () {
        this.visible = !this.visible
      },

      add (snap) {
        Vue.set(this.configs, snap.key, snap.val())
        snap.ref.on('value', this.update)

        if (!this.selection) {
          this.selection = snap.key
        }
      },

      remove (snap) {
        Vue.delete(this.configs, snap.key)
        snap.ref.off('value', this.update)

        if (this.selection === snap.key) {
          this.selection = Object.keys(this.configs)[0]
        }
      },

      update (snap) {
        this.configs[snap.key] = snap.val()
      },

      create () {
        this.selection = this.model.push({
          name: 'Untitled',
          config: config.default()
        }).key
      },

      copy () {
        this.selection = this.model.push(
          this.configs[this.selection]
        ).key
      },

      save () {
        this.model.child(this.selection).child('config').set(this.config)
      },

      rename () {
        if (this.name) {
          this.model.child(this.selection).child('name').set(this.name)
          this.blur()
        } else {
          this.name = this.configs[this.selection].name
        }
      },

      destroy () {
        this.model.child(this.selection).set(null)
      },

      blur () {
        this.name = null
      }
    }
  }
</script>

<template>
  <div :class="$style.module">
    <div >
      <span v-if="visible" :class="$style.button" @click="toggle">hide</span>
      <span v-else :class="$style.button" @click="toggle">edit</span>
    </div>

    <table v-if="visible">
      <tr>
        <td>Config</td>
        <td>
          <select v-if="name === null" v-model="selection">
            <option disabled value="">Please select one</option>
            <option
              v-for="(config, key) in configs"
              v-text="config.name"
              :value="key"
              :key="key"
            />
          </select>
          
          <input v-else type="text" v-model="name" @keydown.enter="rename" @blur="blur">
        </td>
      </tr>

      <tr>
        <td></td>
        <td>
          <span :class="$style.button" @click="create">new</span>
          <template v-if="config">
            <span :class="$style.button" @click="copy">copy</span>
            <span :class="$style.button" @click="rename">rename</span>
            <span :class="$style.button" @click="save">save</span>
            <span :class="$style.button" @click="destroy">delete</span>
          </template>
        </td>
      </tr>

      <template v-if="config">
        <slider v-for="(value, key) in config" v-bind:config="value" :name="key" :key="key" />
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
    position: absolute;
    background: rgba(50,50,50,0.7);
    font-size: 12px;
  }

  .button {
    cursor: pointer;
    padding: 4px;
  }
</style>


