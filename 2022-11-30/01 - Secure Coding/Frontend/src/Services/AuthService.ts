import axios from 'axios';
import appConfig from '../Utils/AppConfig';
import { AuthActionType, authStore } from '../Redux/AuthState';
import UserModel from "../Models/UserModel";
import CredentialsModel from '../Models/CredentialsModel';

class AuthService {

    public async register(user: UserModel): Promise<void> {
        const response = await axios.post<string>(appConfig.registerUrl, user);
        const token = response.data;
        authStore.dispatch({ type: AuthActionType.Register, payload: token });
    }

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<string>(appConfig.loginUrl, credentials);
        const token = response.data;
        authStore.dispatch({ type: AuthActionType.Login, payload: token });
    }

    public logout(): void {
        authStore.dispatch({ type: AuthActionType.Logout });
    }

    public isLoggedIn(): boolean {
        return authStore.getState().token !== null;
    }

    public async getOneUser(id: number): Promise<UserModel> {
        const response = await axios.get<UserModel>(appConfig.usersUrl + id);
        const user = response.data;
        return user;
    }

    public async updateUser(user: UserModel): Promise<void> {
        const response = await axios.patch<UserModel>(appConfig.usersUrl + user.id, user);
        const updatedUser = response.data;
        authStore.dispatch({ type: AuthActionType.Update, payload: updatedUser });
    }

}

const authService = new AuthService();

export default authService;