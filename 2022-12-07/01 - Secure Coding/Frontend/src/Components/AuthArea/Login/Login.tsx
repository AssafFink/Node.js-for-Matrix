import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function submit(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            notifyService.success("Welcome Back!");
            navigate("/home");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Login">

            <form onSubmit={handleSubmit(submit)}>

                <label>Username:</label>
                <input type="text" {...register("username")} required minLength={4} maxLength={20} autoFocus />

                <label>Password:</label>
                <input type="password" {...register("password")} required minLength={4} maxLength={20} />

                <button>Login</button>

            </form>
        </div>
    );
}

export default Login;
