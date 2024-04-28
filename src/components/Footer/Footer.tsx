import { UserApis } from "../../Viewer/UserApis/UserApis";
import "./Footer.css";

export default function Footer(){
    function onHomeButtonClick(): void{
        const userApis = UserApis.getInstance();
        userApis.positionToHome();
    }
    return (
        <footer>
            <img src="/assets/icons/home.png" onClick={onHomeButtonClick}></img>
        </footer>
    );
}