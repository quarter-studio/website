// Factory
export default (aspectRatio) => {
  var vertices = 256;
  var stretchX = 2.2;
  var stretchY = 2.6;
  let position = [];
  let indices = [];
  let normal = [];

  for (let x = 0; x < vertices; x++) {
    for (let z = 0; z < vertices; z++) {
      position.push((x * aspectRatio * stretchX) - (vertices * stretchX * aspectRatio / 2));
      position.push(0);
      position.push((z * stretchY) - (vertices * stretchY / 2));
      normal.push(0, 0, 1);
    }
  }

  for (let z = 0; z < vertices - 1; z++) {
    if (z > 0) {
      indices.push(z * vertices);
    }

    for (let x = 0; x < vertices; x++) {
      indices.push(z * vertices + x);
      indices.push((z + 1) * vertices + x);
    }

    if (z < vertices - 2) {
      indices.push((z + 1) * vertices + vertices - 1);
    }
  }

  return {
    position: { numComponents: 3, data: position },
    indices: { numComponents: 1, data: indices },
    normal: { numComponents: 3, data: normal },
  };
};