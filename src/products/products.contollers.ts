import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post('add')
  async addProduct(
    //@Body() completeBody : {title : string , description : string , ..... }
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('category') prodCategory: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedProdId = await this.productsService.addProduct(
      prodTitle,
      prodDesc,
      prodCategory,
      prodPrice,
    );
    return { id: generatedProdId };
  }
  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }

  @Get(':prodId')
  getProduct(@Param('prodId') prodId: string) {
    const product = this.productsService.getProduct(prodId);
    return product;
  }

  @Patch(':prodId')
  async updateProduct(
    @Param('prodId') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('category') prodCategory: string,
    @Body('price') prodPrice: number,
  ) {
    await this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodCategory,
      prodPrice,
    );
    return { msg: 'Product updated successfull' };
  }
  @Delete(':prodId')
  async removeProduct(@Param('prodId') prodId: string) {
    await this.productsService.deleteProduct(prodId);
    return { msg: 'Product successfully deleted' };
  }
}
