import UserModel from "../4-models/user-model";
import jwt from "jsonwebtoken";
import { Request } from "express";
import crypto from "crypto";

const secretKey = "MatrixStudentsAreTheBest!";

function getNewToken(user: UserModel): string {
    delete user.password;
    const container = { user };
    const options = { expiresIn: "3h" };
    const token = jwt.sign(container, secretKey, options);
    return token;
}

// authorization: Bearer the-token...
//                01234567
//                       ^
function verifyToken(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        try {

            // If no authorization header:
            const header = request.header("authorization");
            if(!header) {
                resolve(false);
                return;
            }

            // Extract the token:
            const token = header.substring(7);

            // If no token: 
            if(!token) {
                resolve(false);
                return;
            }

            // Here we have a token (valid or invalid) - verify the token:
            jwt.verify(token, secretKey, err => {

                // If token invalid:
                if(err) {
                    resolve(false);
                    return;
                }

                // Here the token is valid!
                resolve(true);
            });

        }
        catch(err: any) {
            reject(err);
        }
    });
}

function getUser(token: string): UserModel {
    const container: any = jwt.decode(token);
    const user = container.user;
    return user;
}

const salt = "MakeThingsGoRight";

function hash(plainText: string): string {

    // Hash without salt: 
    // const hashPassword = crypto.createHash("sha512").update(plainText).digest("hex");

    // Hash with salt: 
    const hashPassword = crypto.createHmac("sha512", salt).update(plainText).digest("hex");

    return hashPassword;
}

export default {
    getNewToken,
    verifyToken,
    getUser,
    hash
};
