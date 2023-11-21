import { Body, Controller, Delete, Param, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { LoginParams, LoginReturn } from "./dto/login.dto";
import { CreateUserParams, CreateUserReturn } from "./dto/createUser.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { CheckGuard } from "src/guards/check.guard";

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('login')
	public login(@Body() body: LoginParams): Promise<LoginReturn> {
		return this.userService.authenticateUser(body);
	}

	@Post('registration')
	public registration(@Body() body: CreateUserParams): Promise<CreateUserReturn> {
		return this.userService.createUser(body);
	}

    @UseGuards(AuthGuard, CheckGuard)
	@Delete(':uid')
	public deleteUser(@Param('uid') uid: string): Promise<boolean> {
		return this.userService.deleteUser(uid);
	}
}