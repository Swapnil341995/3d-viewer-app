import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

class Canvas {//todo: refactor
    private static canvas: HTMLCanvasElement | null = null;

    public static getCanvas() {
        if (!Canvas.canvas) {
            Canvas.canvas = document.getElementById('canvas-viewer') as HTMLCanvasElement;
        }
        return Canvas.canvas;
    }
}

/**
 * Singleton class
 * All the essential data needed to control the viewer would be
 * handled and created here
 */
export class ThreeViewer {
    private static instance: ThreeViewer;
    private object3d: THREE.Object3D | undefined = undefined;

    public canvas: HTMLCanvasElement | OffscreenCanvas | undefined = undefined;
    public scene: THREE.Scene | undefined = undefined;
    public sceneObject: THREE.Object3D | undefined = undefined;

    width: number | undefined;
    height: number | undefined;
    fov: number | undefined;
    aspect: number | undefined;
    near: number | undefined;
    far: number | undefined;
    left: number | undefined;
    right: number | undefined;
    bottom: number | undefined;
    top: number | undefined;
    camera: THREE.PerspectiveCamera | undefined;
    axisTriadCamera: undefined;
    renderer: THREE.WebGLRenderer | undefined;
    axisTriadRenderer: undefined;
    controls: OrbitControls | undefined;
    rayCaster: THREE.Raycaster | undefined;
    pointer: THREE.Vector2 | undefined;
    private constructor() {
        console.log("THREE JS R:", THREE.REVISION);
        this.canvas = Canvas.getCanvas();
        this.setUpViewer();
    }
    private setUpViewer() {
        //scene
        this.scene = new THREE.Scene();
        this.scene.name = "root scene";

        //Object3D
        this.object3d = new THREE.Object3D();
        this.object3d.name = "sceneObject";
        this.scene.add(this.object3d);

        //sceneObject 
        this.sceneObject = this.scene.children[0];
        this.initializeOrResetCanvas();

        //camera
        this.camera = undefined;//main scene camera

        //axis triad
        this.axisTriadCamera = undefined;//camera for axis triad scene
        this.axisTriadRenderer = undefined//renderer for axis triad canvas

        //renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true, // not much difference if enabled
            // clearColor: 0xFFFFFF,
            // clearAlpha: 1,
            logarithmicDepthBuffer: true,
        });
        this.controls = undefined;//trackball or orbit control
        this.rayCaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();
    }
    public initializePerspectiveCamera(): void {
        this.camera = undefined;
        this.camera = new THREE.PerspectiveCamera(
            this.fov,
            this.aspect,
            this.near,
            this.far
        );
        this.camera.name = "perspective camera";
        this.camera.position.z = 10;
        this.scene?.add(this.camera);
        this.camera.updateProjectionMatrix();
    }
    private initializeOrResetCanvas(): void {//todo rename this method name
        this.width = window.innerWidth;
        this.height = window.innerHeight - 25;

        //for perspective camera
        this.fov = 45;
        this.aspect = this.width / this.height;
        this.near = 0.001;
        this.far = 20000;

        //for orthographic camera
        this.left = this.width / -2;
        this.right = this.width / 2;
        this.bottom = this.height / -2;
        this.top = this.height / 2;
    }
    public setSceneBackgroundColor(color: THREE.Color){
        this.scene!.background = color;
    }
    /**
     * 
     * @returns single static instance of the ThreeViewer
     */
    public static getInstance(): ThreeViewer {
        if (!ThreeViewer.instance) {
            ThreeViewer.instance = new ThreeViewer();

            // @ts-expect-error adding a property in global window object
            window['threeViewer'] = ThreeViewer.instance;
        }
        
        return ThreeViewer.instance;
    }
}