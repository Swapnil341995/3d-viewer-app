import { ThreeViewer } from "./ThreeViewer";
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/Addons.js";
import animate from "./Animate";
import { loadGltfGlb } from "./utils/Loaders";
import { handleWindowResize } from "./Events";
import { AmbLight } from "./Lights";

/**
 * Initializes, sets up and renders the required components of 3d-viewer
 */
export default function InitViewer(): void {
    
    //initialization
    const viewer = ThreeViewer.getInstance();
    const ambLight = new AmbLight();

    //set up
    viewer.setSceneBackgroundColor(new THREE.Color(0xf5f5f5));
    window.addEventListener('resize', handleWindowResize);
    viewer.renderer?.setSize(window.innerWidth, window.innerHeight - 50);
    viewer.renderer?.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    viewer.initializePerspectiveCamera();
    viewer.controls = new OrbitControls(//refactor
        viewer.camera as THREE.Camera,
        viewer.renderer!.domElement
    );
    loadGltfGlb("/assets/glb/BrainStem.glb");
    viewer.scene?.add(ambLight.addOrUpdateAmbientLight(30));

    //render
    animate();
}
