import { Inject, Injectable } from '@nestjs/common';
import {
  CreateProductDto,
  Product,
  UpdateProductDto,
} from '@penny/shared-validation';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private productModel: Model<Product>
  ) {}
  create(createProductDto: CreateProductDto) {
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  findAll() {
    return this.productModel.find().exec();
  }

  findOne(id: string) {
    return this.productModel.findById(id).exec();
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
