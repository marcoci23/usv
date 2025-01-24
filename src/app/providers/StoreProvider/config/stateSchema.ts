import { UserSchema } from "entities/User";
import { loginSchema } from "feautures/authByUsername";

export interface stateSchema {
    loginForm: loginSchema
    user: UserSchema
}