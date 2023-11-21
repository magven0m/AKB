import { DynamicModule } from '@nestjs/common';
import { join } from 'path';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './models/user.model';
import { Article } from './models/article.model';

export const EnvRegistration: DynamicModule = ConfigModule.forRoot({
	envFilePath: join(__dirname, '..', '.env')
});

export const SequelizeConnection = SequelizeModule.forRoot({
	dialect: 'postgres',
	database: process.env.DATABASE_NAME,
	password: process.env.DATABASE_PASSWORD,
	host: process.env.DATABASE_HOST,
	port: Number.parseInt(process.env.DATABASE_PORT),
	username: process.env.DATABASE_USERNAME,
	autoLoadModels: true,
	sync: {
		alter: true
	},
	models: [Article, User]
});
