const TOTAL = 500;
let birds = [];
let savedBirds = [];
let pipes = [];
let counter = 0;
let slider;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 100, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
cube.position.x = -90;
cube.position.y = cube.position.y + cube.geometry.parameters.height / 2;

camera.position.z = 100;
camera.position.y = 50;

document.addEventListener("keydown", () => {
  a.up();
});

for (let i = 0; i < TOTAL; i++) {
  birds[i] = new Bird();
  birds[i].crear();
}

function animate() {
  requestAnimationFrame(animate);

  if (counter % 75 == 0) {
    pipes.push(new Pipe());
  }

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    if (pipes[i].offscreen()) {
      scene.remove(pipes[i].cube);
      scene.remove(pipes[i].cube2);
      pipes.splice(i, 1);
    }
  }
  counter++;

  for (let bird of birds) {
    bird.think(pipes);
    bird.update();
  }
  renderer.render(scene, camera);
}

animate();
