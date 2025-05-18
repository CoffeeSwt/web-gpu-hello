import * as THREE from "three";

class Engine {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private clock: THREE.Clock;
  private objects: THREE.Mesh[];
  private mouse: THREE.Vector2;

  constructor(renderTarget: HTMLElement) {
    this.container = renderTarget;
    const width = this.container.offsetWidth;
    const height = this.container.offsetHeight;

    // 初始化
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.clock = new THREE.Clock();
    this.objects = [];
    this.mouse = new THREE.Vector2(0, 0); // 初始化鼠标位置

    // 设置渲染器
    this.renderer.setSize(width, height);
    this.container.appendChild(this.renderer.domElement);

    // 使用 ResizeObserver 调整渲染器大小，并更新相机纵横比
    const ob = new ResizeObserver(this.onResize.bind(this)); // 确保 onResize 方法绑定正确
    ob.observe(this.container);

    // 监听鼠标移动事件
    this.container.addEventListener("mousemove", this.onMouseMove.bind(this));
  }

  private onResize() {
    const width = this.container.offsetWidth;
    const height = this.container.offsetHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  // 鼠标移动事件
  private onMouseMove(event: MouseEvent): void {
    const rect = this.container.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width; // 标准化 X 坐标
    const y = (event.clientY - rect.top) / rect.height; // 标准化 Y 坐标
    this.mouse.setX(x).setY(y);
  }

  // 动画循环
  private animate(): void {
    requestAnimationFrame(this.animate.bind(this));
    this.render();
  }

  // 渲染
  private render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  // 启动引擎
  public start(): void {
    this.animate();
  }

  // 添加物体到场景
  public addObj(mesh: THREE.Mesh) {
    this.objects.push(mesh);
    this.scene.add(mesh);
  }

  // 删除物体从场景中
  public removeObj(mesh: THREE.Mesh) {
    const index = this.objects.indexOf(mesh);
    if (index !== -1) {
      this.objects.splice(index, 1); // 从数组中移除
      this.scene.remove(mesh); // 从场景中移除
    }
  }

  public setCameraPosition(pos: THREE.Vector3) {
    this.camera.position.set(pos.x, pos.y, pos.z);
  }
  public setCameraLookAt(pos: THREE.Vector3) {
    this.camera.lookAt(pos.x, pos.y, pos.z);
  }

}

export default Engine;
