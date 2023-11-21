import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserParams, CreateUserReturn } from './dto/createUser.dto';
import { LoginParams, LoginReturn } from './dto/login.dto';
import { Redis } from 'src/redis/redis';
import * as randomstring from 'randomstring';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User) private readonly userRepository: typeof User
	) {}

	public async createUser({ email, password }: CreateUserParams): Promise<CreateUserReturn> {
		const salt = bcrypt.genSaltSync();
		const hash = bcrypt.hashSync(password, salt);

		const result = await this.userRepository.create({ email, salt, hash });
		return {uid: result.uid, email: result.email};
	}

	public async deleteUser(uid: string): Promise<boolean> {
		const result = (await this.userRepository.destroy({ where: { uid } })) ? true : false;
        Redis.deleteSession(uid);
        return result;
    }

	public async authenticateUser({ email, password }: LoginParams): Promise<LoginReturn> {
		const user = await this.userRepository.findOne({ where: { email } });
		if (!user) throw new HttpException('Wrong email or password!', 403);

		const hash = bcrypt.hashSync(password, user.salt);
		if (hash !== user.hash) throw new HttpException('Wrong email or password!', 403);

		const payload = this.getLoginPayload(user);
		Redis.setSession(payload);

		return payload;
	}

	private getLoginPayload(user: User): LoginReturn {
		const payload = { email: user.email, uid: user.uid };
		return {
			...payload,
			token: randomstring.generate({length: 128}) //its just example
		};
	}
}
