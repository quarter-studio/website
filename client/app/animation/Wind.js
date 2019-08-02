export default () => {
  let direction = 0;
  let offset = [0, 0];
  let speed = 0;

  return (wind, radius, theta, delta) => {
    theta = theta - direction;

    radius = Math.max(0, radius - wind.influence.inner);
    radius = Math.min(1, radius / (wind.influence.outer - wind.influence.inner));
    radius = wind.speed.min + (wind.speed.max - wind.speed.min) * radius;
    direction += theta * wind.direction.ease;
    speed += (radius - speed) * wind.speed.ease;

    if (theta > Math.PI) {
      direction += 2 * Math.PI;
    } else if (theta < -Math.PI) {
      direction -= 2 * Math.PI;
    }

    offset[0] += speed * Math.cos(direction) * .000001;
    offset[1] += speed * Math.sin(direction) * .000001;

    return offset;
  }
}


// this.wind = {
//   direction: 0,
//   radius: 0.75,
//   theta: 2,
//   speed: 0,
// }

// var direction = this.get('windDirectionEase')
// var speed = this.get('windSpeedEase')
// var outer = this.get('windInfluenceOuter');
// var inner = this.get('windInfluenceInner');
// var min = this.get('windSpeedMin');
// var max = this.get('windSpeedMax');

// var wind = this.wind
// var theta = wind.theta - wind.direction;
// var radius = Math.max(0, wind.radius - inner);
// radius = Math.min(1, radius / (outer - inner));
// radius = min + (max - min) * radius;

// wind.direction += theta * direction;
// wind.speed += (radius - wind.speed) * speed;

// if (theta > Math.PI) {
//   wind.direction += 2 * Math.PI;
// } else if (theta < -Math.PI) {
//   wind.direction -= 2 * Math.PI;
// }

// this.uniforms.u_offset[0] += wind.speed * Math.cos(wind.direction) * .000001;
// this.uniforms.u_offset[1] += wind.speed * Math.sin(wind.direction) * .000001;