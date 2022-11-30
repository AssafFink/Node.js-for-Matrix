import "./Register.css";
import { useForm } from "react-hook-form";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";

function Register(): JSX.Element {

    const { register, handleSubmit } = useForm<UserModel>();
    const navigate = useNavigate();

    async function submit(user: UserModel) {
        try {
            await authService.register(user);
            notifyService.success("Welcome!");
            navigate("/home");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Register">

            <form onSubmit={handleSubmit(submit)}>

                <label>First Name:</label>
                <input type="text" {...register("firstName")} required minLength={2} maxLength={20} autoFocus />

                <label>Last Name:</label>
                <input type="text" {...register("lastName")} required minLength={2} maxLength={20} />

                <label>Username:</label>
                <input type="text" {...register("username")} required minLength={4} maxLength={20} />

                <label>Password:</label>
                <input type="password" {...register("password")} required minLength={4} maxLength={20} />

                <button>Register</button>

            </form>
            
        </div>
    );
}

export default Register;