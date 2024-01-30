import { Controller, Get, Query } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { PagesService } from './pages.service'
import { ListPagesQueryDto, ListPagesResDto } from './pages.dto'

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
}
