import * as THREE from "three";
import { TypedEmitter } from "tiny-typed-emitter";
import { SurfaceKeyboardEvents, SurfaceHandlers } from "./surface.events";

interface ISurface {}

export class Surface extends TypedEmitter<SurfaceHandlers> implements ISurface {
  private renderer: THREE.Renderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private world: THREE.Group;

  constructor(private container: HTMLDivElement) {
    super();

    this.camera = new THREE.PerspectiveCamera(28, window.innerWidth / window.innerHeight, 0.1, 1e6);
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      precision: "highp",
    });
    this.scene = new THREE.Scene();
    this.world = new THREE.Group();
    this.createLightning();
    this.scene.add(this.world);
    this.container.appendChild(this.renderer.domElement);
  }

  private createLightning = () => {
    const skyColor = 0xb1e1ff; // light blue
    const groundColor = 0xb97a20; // brownish orange

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.25));
    this.scene.add(new THREE.HemisphereLight(skyColor, groundColor, 0.25));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(-70, -70, 100).normalize();
    this.scene.add(directionalLight);
  };

  private render = () => {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
  };

  public addLayer = () => {};

  public addControl = () => {};

  public forceRender = () => {
    requestAnimationFrame(() => this.renderer.render(this.scene, this.camera));
  };
}
