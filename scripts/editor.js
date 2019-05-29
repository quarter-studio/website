import Editor from './views/Editor.js'

var vue = document.createElement('script')
vue.src = 'https://cdn.jsdelivr.net/npm/vue'
vue.onload = (event) => {
  window.editor = new Vue(Editor)
  window.editor.$mount(
    document.body.appendChild(
      document.createElement('div')
    )
  )
}
document.body.appendChild(vue)