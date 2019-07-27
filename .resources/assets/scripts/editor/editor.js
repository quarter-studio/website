import Vue from 'vue'
import editor from './views/editor'

export default new Vue({
  el: document.body.appendChild(
    document.createElement('div')
  ),

  render (h) {
    return h(editor)
  }
})