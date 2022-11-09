import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  addProduct(title: string, desc: string, category: string, price: number) {
    const prodId = uuid();
    const newProduct = new Product(prodId, title, desc, category, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }
  getProduct(prodId: string) {
    const product = this.findProduct(prodId)[0];
    if (!product) {
      throw new NotFoundException('Couldnot find product with the given id');
    }
    return { ...product };
  }

  updateProduct(
    prodId: string,
    title: string,
    description: string,
    category: string,
    price: number,
  ) {
    const [product, index] = this.findProduct(prodId);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;
  }

  deleteProduct(prodId: string) {
    const [product, index] = this.findProduct(prodId);
    if (!product) {
      throw new NotFoundException('Couldnot find the product');
    }
    this.products.splice(index, 1);
  }

  private findProduct(prodId: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === prodId);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Couldnot find product with the given id');
    }
    return [product, productIndex];
  }
}
