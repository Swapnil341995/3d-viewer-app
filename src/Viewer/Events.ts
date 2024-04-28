import { ThreeViewer } from "./ThreeViewer";

function handleWindowResize(): void{
    const viewer = ThreeViewer.getInstance();
    const width = window.innerWidth;
    const height = window.innerHeight;
    viewer.camera!.aspect = width/height;
    viewer.renderer?.setSize(width, height);
    viewer.camera?.updateProjectionMatrix();
}

export {handleWindowResize};