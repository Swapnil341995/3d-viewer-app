import { ThreeViewer } from './ThreeViewer';

export default function animate(): void {
    const viewer = ThreeViewer.getInstance();
    requestAnimationFrame(animate);
    viewer.controls?.update();
    viewer.renderer?.render(viewer.scene!, viewer.camera!);
}