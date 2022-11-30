import { OkPacket } from "mysql";
import cyber from "../2-utils/cyber";
import dal from "../2-utils/dal";
import CredentialsModel from "../4-models/credentials-model";
import { UnauthorizedError, ValidationError } from "../4-models/error-models";
import UserModel from "../4-models/user-model";

async function register(user: UserModel): Promise<string> {

    const error = user.validate();
    if (error) throw new ValidationError(error);

    // Check also if username already exists...

    user.password = cyber.hash(user.password);

    const sql = `INSERT INTO users VALUES(
        DEFAULT,
        '${user.firstName}',
        '${user.lastName}',
        '${user.username}',
        '${user.password}')`;

    const info: OkPacket = await dal.execute(sql);
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

export default {
    register,
    login
};