import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from 'src/models/article.model';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { CheckGuard } from 'src/guards/check.guard';

@UseGuards(AuthGuard)
@Controller('article')
export class ArticleController {
	constructor(private readonly articleService: ArticleService) {}

	@Post('all')
	public getArticles(
		@Body() body: { tags: string[] },
		@Req() req: Request & { user: { uid: string } }
	): Promise<Article[]> {
		return this.articleService.getArticles({ tags: body?.tags, uid: req?.user?.uid });
	}

	@Get(':uid')
	public getArticle(
		@Param('uid') uid: string,
		@Req() req: Request & { user: { uid: string } }
	): Promise<Article> {
		console.log(uid);
		return this.articleService.getArticle({ userUid: req?.user?.uid, uid });
	}

	@UseGuards(CheckGuard)
	@Delete(':uid')
	public deleteArticle(@Param('uid') uid: string): Promise<boolean> {
		return this.articleService.deleteArticle(uid);
	}

	@UseGuards(CheckGuard)
	@Post('create')
	public createArticle(
		@Body() data: { title: string; text: string; isPublic: boolean; tags: string[] }
	): Promise<Article> {
		return this.articleService.createArticle(data);
	}

	@UseGuards(CheckGuard)
	@Post('update')
	public updateArticle(
		@Body() data: { uid: string, title: string; text: string; isPublic: boolean; tags: string[] }
	): Promise<Article[]> {
		return this.articleService.updateArticle(data);
	}
}
