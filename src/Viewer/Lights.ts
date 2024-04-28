import * as THREE from 'three';
import { ThreeViewer } from './ThreeViewer';

class AmbLight {
    public ambientLight: THREE.AmbientLight | undefined;
    private viewer: ThreeViewer;
    constructor() {
        this.viewer = ThreeViewer.getInstance();
    }

    addOrUpdateAmbientLight(intensity: number = 0.5, color: THREE.Color = new THREE.Color(0x404040)): THREE.AmbientLight {//todo: refactor
        const ambLight = this.viewer.scene?.getObjectByName("default_ambient_light") as THREE.AmbientLight;
        if (ambLight === undefined) {
            const light = new THREE.AmbientLight(color);
            light.name = "default_ambient_light";
            light.intensity = intensity;
            return light;
        }
        else {
            ambLight.intensity = intensity;
            return ambLight;
        }
    }
}

export {
    AmbLight
}