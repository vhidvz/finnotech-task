import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SentryInterceptor } from '@ntegral/nestjs-sentry';
import { AllExceptionsFilter } from '@app/common/filters';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { User } from './entities';
import { UsersService } from './users.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard)
@UseFilters(AllExceptionsFilter)
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({ transform: true }))
@UseInterceptors(...GatewayInterceptors, new SentryInterceptor())
export class CategoriesController {
  constructor(private readonly service: UsersService) {}

  @Post()
  create(@Body() createDto: CreateCategoryDto): Promise<User> {
    return this.service.create(createDto);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDto: UpdateCategoryDto) {
    return this.service.update(id, updateDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.service.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.delete(id);
  }
}
