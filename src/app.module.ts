import { Module } from '@nestjs/common';
import { ArticleModule } from './modules/article/article.module';
import { UserModule } from './modules/user/user.module';
import { AuthGuard } from './guards/auth.guard';
import { CheckGuard } from './guards/check.guard';
import { EnvRegistration, SequelizeConnection } from './app.config';

@Module({
	imports: [
    EnvRegistration,
    SequelizeConnection,
    ArticleModule,
    UserModule
	],
  providers: [AuthGuard, CheckGuard]
})
export class AppModule {}
