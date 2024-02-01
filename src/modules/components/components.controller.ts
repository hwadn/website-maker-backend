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
import { ComponentsService } from './components.service'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  ListComponentsQueryDto,
  ListComponentsResDto,
  CreateComponentBodyDto,
  IUpdateComponentParams,
} from './components.dto'
import { IRequest } from 'src/types/request'

@ApiTags('Components')
@Controller('components')
export class ComponentsController {
  constructor(private readonly componentService: ComponentsService) {}

  @Get()
  @ApiResponse({ type: ListComponentsResDto })
  listComponents(@Query() query: ListComponentsQueryDto) {
    const { pageSize = 10, pageNum = 1 } = query
    return this.componentService.listComponents(
      Number(pageSize),
      Number(pageNum),
    )
  }

  @Post()
  async createComponent(
    @Body() body: CreateComponentBodyDto,
    @Request() request: IRequest,
  ) {
    const user = request.user
    console.log('user:', user)
    const insertRes = await this.componentService.createComponent({
      ...body,
      creator_id: user.uid,
    })
    return insertRes.raw.insertId
  }

  @Patch('/:componentId')
  async updateComponent(
    @Body() body: CreateComponentBodyDto,
    @Param() params: IUpdateComponentParams,
  ) {
    const insertRes = await this.componentService.updateComponent({
      ...body,
      componentId: Number(params.componentId),
    })
    return insertRes.raw.insertId
  }
}
