class Bird {
  constructor(brain) {
    this.y = 50;
    this.x = 4;

    this.gravity = -0.05;
    this.lift = 1;
    this.velocity = 0;

    this.score = 0;
    this.fitness = 0;
    this.geometry = new THREE.BoxGeometry(5, 5, 5);
    this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.cube.position.y = this.y;
    this.raycast = new THREE.Raycaster(
      this.cube.position,
      new THREE.Vector3(1, 0, 0),
      0,
      1
    );
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(5, 8, 2);
    }
  }
  crear() {
    scene.add(this.cube);
  }
  up() {
    this.velocity += this.lift;
  }
  think(pipes) {
    // Find the closest pipe
    let closest = null;
    let closestD = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let d = pipes[i].x + pipes[i].w - this.x;
      if (d < closestD && d > 0) {
        closest = pipes[i];
        closestD = d;
      }
    }

    let inputs = [];
    inputs[0] = this.cube.position.y / 100;
    inputs[1] =
      closest.cube.position.y - closest.cube.geometry.parameters.height / 100;
    inputs[2] =
      closest.cube.position.y + closest.cube.geometry.parameters.height / 100;
    inputs[3] = closest.x / 90;
    inputs[4] = this.velocity / 10;
    let output = this.brain.predict(inputs);
    //if (output[0] > output[1] && this.velocity >= 0) {
    if (output[0] > output[1]) {
      this.up();
    }
  }
  hit() {
    var intersects = this.raycast.intersectObjects(scene.children);
    for (let i = 0; i < intersects.length; i++) {
      if ((intersects[i].object.name = "pipe")) {
        return true;
      }
    }
    return false;
  }
  offScreen() {
    return this.y > 100 || this.y < 0;
  }
  update() {
    //console.log(this.raycast.ray.origin);
    this.score++;
    this.cube.position.y = this.y;
    this.cube.position.x = this.x;
    this.velocity += this.gravity;
    //this.velocity *= 0.9;
    this.y += this.velocity;
  }
}
