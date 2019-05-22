export var load = (url, method) => {
  var script = document.createElement('script')
  script.src = url
  script.onload = method
  return document.body.appendChild(script)
}