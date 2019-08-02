// Vendor
import { m4 } from 'twgl.js';

// Factory
export default () => {
  var position = [0, 500, -1];
  var target = [0, 0, 0];
  var up = [0, 1, 0];

  return m4.lookAt(position, target, up);
};