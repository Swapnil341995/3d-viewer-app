import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { ThreeViewer } from "../ThreeViewer";
import { UserApis } from "../UserApis/UserApis";

/**
 * Adds the loaded glTF/glb model into the viewer sceneObject
 * @param resource resource path of glTF or glb model
 */
function loadGltfGlb(resource: string){
    const viewer = ThreeViewer.getInstance();
    const loader = new GLTFLoader();
    // Load a glTF and glb resource
    loader.load(
        // resource URL
        resource,
        function (gltf) {
            viewer.sceneObject?.add(gltf.scene);
            const userApis = UserApis.getInstance();
            userApis.positionToHome();
        },

        // called while loading is progressing
        function (xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },

        // called when loading has errors
        function (error) {
            console.log(error, "An error happened");
        }
    );
}

export {loadGltfGlb};