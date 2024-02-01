import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { PagesService } from './pages.service'
import {
  CreatePageBodyDto,
  IUpdatePageParams,
  ListPagesQueryDto,
  ListPagesResDto,
} from './pages.dto'
import { IRequest } from 'src/types/request'

@ApiTags('Pages')
@Controller('pages')
export class PagesController {
  constructor(private readonly pageService: PagesService) {}

  @Get()
  @ApiResponse({ type: ListPagesResDto })
  listPages(@Query() query: ListPagesQueryDto): Promise<ListPagesResDto> {
    const { pageSize = 10, pageNum = 1 } = query
    return this.pageService.listPages(Number(pageSize), Number(pageNum))
  }

  @Post()
  async createPage(
    @Body() body: CreatePageBodyDto,
    @Request() request: IRequest,
  ) {
    const user = request.user
    const insertRes = await this.pageService.createPage({
      ...body,
      creator_id: user.uid,
    })
    return insertRes.raw.insertId
  }

  @Patch('/:pageId')
  async updatePage(
    @Body() body: CreatePageBodyDto,
    @Param() params: IUpdatePageParams,
  ) {
    console.log('params:', params)
    const insertRes = await this.pageService.updatePage({
      ...body,
      pageId: Number(params.pageId),
    })
    return insertRes.raw.insertId
  }
}
