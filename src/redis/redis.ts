import { UnauthorizedException } from '@nestjs/common';
import { LoginReturn } from 'src/modules/user/dto/login.dto';

export class Redis {
	private static tokenUser: Map<string, LoginReturn> = new Map();
	private static userToken: Map<string, string> = new Map();

	public static authorizeUser(token: string): LoginReturn {
		const user = Redis.tokenUser.get(token);
		if (!user) throw new UnauthorizedException();
		return user;
	}

    public static deleteSession(uid: string): void {
        const token = Redis.userToken.get(uid);
        Redis.userToken.delete(uid);
        Redis.tokenUser.delete(token);
    }

    public static setSession({uid, email, token}: {uid: string, email: string, token: string}): void {
        Redis.deleteSession(uid);
        Redis.tokenUser.set(token, {uid, email, token});
        Redis.userToken.set(uid, token);
    }
}
