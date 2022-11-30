import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <h1>Northwind Traders</h1>
            <AuthMenu />
        </div>
    );
}

export default Header;
