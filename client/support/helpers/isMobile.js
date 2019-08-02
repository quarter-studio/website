// Binding
export default (
  typeof window !== 'undefined' &&
  typeof window.orientation !== 'undefined' ||
  navigator.userAgent.indexOf('IEMobile') !== -1
);