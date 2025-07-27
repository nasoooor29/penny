import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateProductDto,
  CreateProductDtoSchema,
  UpdateProductDto,
  UpdateProductDtoSchema,
} from '@penny/shared-validation';
import { ZodValidationPipe } from '../pipes/zod';
import { SessionGuard } from './session.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  @UsePipes(new ZodValidationPipe(CreateProductDtoSchema))
  @UseGuards(SessionGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(SessionGuard)
  update(
    @Body(new ZodValidationPipe(UpdateProductDtoSchema))
    updateProductDto: UpdateProductDto,
    @Param('id') id: string
  ) {
    return this.productService.update(id, updateProductDto);
  }
  @Delete(':id')
  @UseGuards(SessionGuard)
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
