import { useEffect, useRef } from "react";
import InitViewer from "../../Viewer/Init";
import "./Canvas.css";

export default function Canvas({...props}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        InitViewer();
    }, []);
    return (
        <canvas {...props} ref={canvasRef} id="canvas-viewer"></canvas>
    );
}