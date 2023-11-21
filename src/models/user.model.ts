import sequelize from "sequelize";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'users', timestamps: false })
export class User extends Model<User> {
	@Column({ type: DataType.UUID, primaryKey: true, defaultValue: sequelize.fn('gen_random_uuid') })
	public uid: string;

	// @Index({
	// 	name: 'email_index',
	// 	using: 'BTREE'
	// }) //не знаю надо ли ставить индексы, поэтому я сделал только на почту в виде коммента. Скорее всего планировщик всё равно не будет использовать индекс когда в бд немного пользователей
	@Column({ type: DataType.STRING(64), allowNull: false })
	public email: string;

	@Column({ type: DataType.TEXT, allowNull: false })
	public hash: string;

	@Column({ type: DataType.TEXT, allowNull: false })
	public salt: string;
}