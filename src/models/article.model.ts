import sequelize from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'articles', timestamps: false })
export class Article extends Model<Article> {
	@Column({ type: DataType.UUID, primaryKey: true, defaultValue: sequelize.fn('gen_random_uuid') })
	public uid: string;

	@Column({ type: DataType.STRING(64), allowNull: false })
	public title: string;

	@Column({ type: DataType.TEXT, allowNull: false })
	public text: string;

	@Column({ type: DataType.BOOLEAN, allowNull: false })
	public isPublic: boolean;

	@Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: null })
	public tags: string[];
}
