import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Products') private readonly productModel: Model<Product>,
  ) {}

  async addProduct(
    title: string,
    desc: string,
    category: string,
    price: number,
  ) {
    const prodId = uuid();
    const newProduct = new this.productModel({
      title: title,
      description: desc,
      category: category,
      price: price,
    });
    const inventoryId = await newProduct.save();
    return inventoryId.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      category: prod.category,
      price: prod.price,
    }));
  }
  async getProduct(prodId: string) {
    const product = await this.findProduct(prodId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price,
    };
  }

  async updateProduct(
    prodId: string,
    title: string,
    description: string,
    category: string,
    price: number,
  ) {
    const updatedProduct = await this.findProduct(prodId);
    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (category) {
      updatedProduct.category = category;
    }
    if (price) {
      updatedProduct.price = price;
    }
    updatedProduct.save();
  }

  async deleteProduct(prodId: string) {
    await this.findProduct(prodId);
    await this.productModel.deleteOne({ _id: prodId }).exec();
  }

  private async findProduct(prodId: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(prodId);
    } catch (error) {
      throw new NotFoundException('Product doesnt exists in the records');
    }
    if (!product) {
      throw new NotFoundException('Couldnot find product with the given id');
    }
    return product;
  }
}
