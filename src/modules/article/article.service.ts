import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Article } from 'src/models/article.model';

@Injectable()
export class ArticleService {
	constructor(@InjectModel(Article) private readonly articleRepository: typeof Article) {}

	public async getArticles({ uid, tags }: { tags?: string[]; uid?: string }): Promise<Article[]> {
		return await this.articleRepository.findAll({
			where: {
				isPublic: uid ? [true, false] : true,
				tags: tags ? { [Op.overlap]: tags } : { [Op.ne]: null }
			}
		});
	}

	public async getArticle({ uid, userUid }: { uid: string; userUid: string }): Promise<Article> {
		return await this.articleRepository.findOne({
			where: {
				uid,
				isPublic: userUid ? [true, false] : true
			}
		});
	}

	public async deleteArticle(uid: string): Promise<boolean> {
		return (await this.articleRepository.destroy({ where: { uid } })) ? true : false;
	}

	public async createArticle(data: {
		title: string;
		text: string;
		isPublic: boolean;
		tags: string[];
	}): Promise<Article> {
		return await this.articleRepository.create(data);
	}

	public async updateArticle({
		uid,
		...data
	}: {
		uid: string;
		title: string;
		text: string;
		isPublic: boolean;
		tags: string[];
	}): Promise<Article[]> {
		return (await this.articleRepository.update(data, { where: { uid }, returning: true }))[1];
	}
}
