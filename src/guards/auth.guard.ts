import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Redis } from 'src/redis/redis';

@Injectable()
export class AuthGuard implements CanActivate {
	public canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();
		try {
			const token = (request.headers.authorization as string).split(' ')[1];
			request.user = Redis.authorizeUser(token);

			return true;
		} catch {
            request.user = null;
            return true;
        }
	}
}
