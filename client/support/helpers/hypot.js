// Setup
const hypot = (...args) => {
  var index = args.length;
  var value = 0;

  while (index--) {
    value += args[index] * args[index];
  }

  return Math.sqrt(value);
}

// Method
export default Math.hypot || hypot