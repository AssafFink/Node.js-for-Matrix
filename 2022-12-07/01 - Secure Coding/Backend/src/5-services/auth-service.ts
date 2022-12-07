import { OkPacket } from "mysql";
import cyber from "../2-utils/cyber";
import dal from "../2-utils/dal";
import CredentialsModel from "../4-models/credentials-model";
import { ResourceNotFoundError, UnauthorizedError, ValidationError } from "../4-models/error-models";
import UserModel from "../4-models/user-model";

async function register(user: UserModel): Promise<string> {

    const error = user.validate();
    if (error) throw new ValidationError(error);

    if (await isUsernameTaken(user.username)) throw new ValidationError(`Username ${user.username} already taken`);

    user.password = cyber.hash(user.password);

    const sql = "INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?)";

    const info: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.username, user.password]);
    user.id = info.insertId;

    const token = cyber.getNewToken(user);

    return token;
}

async function login(credentials: CredentialsModel): Promise<string> {

    const error = credentials.validate();
    if (error) throw new ValidationError(error);

    credentials.password = cyber.hash(credentials.password);

    // Without SQL Injection protection:
    // const sql = `SELECT * FROM users WHERE username='${credentials.username}' AND password='${credentials.password}'`;

    // With SQL Injection protection:
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;

    console.log(sql);

    const users = await dal.execute(sql, [credentials.username, credentials.password]);

    if (users.length === 0) throw new UnauthorizedError("Incorrect username or password");

    const user = users[0];

    const token = cyber.getNewToken(user);

    return token;
}


async function isUsernameTaken(username: string): Promise<boolean> {

    const sql = `SELECT COUNT(*) FROM users WHERE username = ?`;

    const count = (await dal.execute(sql, [username]))[0];

    return count > 0;
}

async function getOneUser(id: number): Promise<UserModel> {

    const sql = `SELECT * FROM users WHERE id = ?`;
    const users = await dal.execute(sql, [id]);

    if (users.length === 0) throw new ResourceNotFoundError(id);

    const user = users[0];

    return user;
}

async function updateUser(user: UserModel): Promise<UserModel> {

    const sql = "UPDATE users SET firstName = ?, lastName = ?, username = ? WHERE id = ?";

    const info: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.username, user.id]);

    if (info.affectedRows === 0) throw new ResourceNotFoundError(user.id);

    return user;
}


export default {
    register,
    login,
    getOneUser,
    updateUser
};