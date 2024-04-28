import "./Header.css";

export default function Header({...props}){
    return (
        <header {...props}>
            <div id="id_headerText">3D-Viewer</div>
        </header>
    );
}