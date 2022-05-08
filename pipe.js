class Pipe {
  constructor(brain) {
    this.spacing = 25;
    this.top = Math.random() * ((3 / 4) * 100) - 100 / 6 + 100 / 6;
    this.bottom = 100 - (this.top + this.spacing);
    this.x = 180 / 2;
    this.w = 80;
    this.speed = 0.6;
    this.material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    this.crear();
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(5, 8, 2);
    }
  }
  crear() {
    //arriba
    this.geometry = new THREE.BoxGeometry(5, this.top, 5);
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.cube.position.x = this.x;
    this.cube.position.y = 100 - this.top / 2;
    this.cube.name = "pipe";
    scene.add(this.cube);

    //abajo
    this.geometry2 = new THREE.BoxGeometry(5, this.bottom, 5);
    this.cube2 = new THREE.Mesh(this.geometry2, this.material);
    this.cube2.position.x = this.x;
    this.cube2.position.y = 0 + this.bottom / 2;
    this.cube2.name = "pipe";
    scene.add(this.cube2);
  }

  mutate() {
    this.brain.mutate(0.1);
  }

  update() {
    this.cube.position.x = this.x;
    this.cube2.position.x = this.x;
    this.x -= this.speed;
  }
  offscreen() {
    if (this.x < -100) {
      return true;
    } else {
      return false;
    }
  }
}
