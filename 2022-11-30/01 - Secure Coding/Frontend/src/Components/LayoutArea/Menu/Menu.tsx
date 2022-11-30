import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import "./Menu.css";

function Menu(): JSX.Element {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

    useEffect(() => {
        setIsLoggedIn(authService.isLoggedIn());
        const unsubscribe = authStore.subscribe(() => {
            setIsLoggedIn(authService.isLoggedIn());
        });
        return unsubscribe;
    }, []);


    return (
        <div className="Menu">
            <NavLink to="/home">Home</NavLink>
            <span> | </span>

            {isLoggedIn &&
                <>
                    <NavLink to="/products">Products</NavLink>
                    <span> | </span>
                </>
            }

            <NavLink to="/forum">Forum</NavLink>
        </div>
    );
}

export default Menu;
