import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(() => setUser(authStore.getState().user));
        return unsubscribe;
    }, []);

    function logout(): void {
        authService.logout();
        notifyService.success("Bye Bye");
    }

    return (
        <div className="AuthMenu">
            {
                !user &&
                <>
                    <span>Hello Guest</span>
                    <span> | </span>
                    <NavLink to="/login">Login</NavLink>
                    <span> | </span>
                    <NavLink to="/register">Register</NavLink>
                </>
            }
            {
                user &&
                <>
                    <span>{user.firstName + " " + user.lastName}</span>
                    <span> | </span>
                    <NavLink to={"/profile/edit/" + user.id}>✍</NavLink>
                    <span> | </span>
                    <NavLink to="/home" onClick={logout}>Logout</NavLink>
                </>
            }
        </div>
    );
}

export default AuthMenu;
