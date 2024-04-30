import { useEffect, useRef } from "react";
import InitViewer from "../../Viewer/Init";
import "./Canvas.css";
import React from "react";

export default function Canvas({ ...props }) {
    const [data, setData] = React.useState(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        InitViewer();
        // const msg = {"a": "b"};
        fetch("http://localhost:3000/")
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log(data.message);
            return setData(data.message)
        })
        .catch((err)=> {
            console.log(err)
        });
    }, []);
    console.log("data after:", data);
    return (
        <>
            <canvas {...props} ref={canvasRef} id="canvas-viewer"></canvas>
            <h1>{data}</h1>
        </>
    );
}