import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./EditUser.css";

// TODO: Replace all EditUser thing with watch credit card or something of a sort because we don't need to GET user via route params due to Redux.

function EditUser(): JSX.Element {

    const { register, handleSubmit, setValue } = useForm<UserModel>();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const id = +params.id;
        authService.getOneUser(id)
            .then(user => {
                setValue("id", user.id);
                setValue("firstName", user.firstName);
                setValue("lastName", user.lastName);
                setValue("username", user.username);
            })
            .catch(err => notifyService.error(err));
    }, []);

    async function submit(user: UserModel) {
        try {
            await authService.updateUser(user);
            notifyService.success("Done");
            navigate("/home");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="EditUser">

            <form onSubmit={handleSubmit(submit)}>

                <input type="hidden" {...register("id")} />

                <label>First Name:</label>
                <input type="text" {...register("firstName")} required minLength={2} maxLength={20} />

                <label>Last Name:</label>
                <input type="text" {...register("lastName")} required minLength={2} maxLength={20} />

                <label>Username:</label>
                <input type="text" {...register("username")} required minLength={4} maxLength={20} />

                <button>Update</button>

            </form>

        </div>
    );
}

export default EditUser;
