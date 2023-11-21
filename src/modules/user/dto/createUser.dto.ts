import { LoginParams } from "./login.dto";

export class CreateUserParams extends LoginParams {}
export class CreateUserReturn {
    public uid: string;
    public email: string;
}