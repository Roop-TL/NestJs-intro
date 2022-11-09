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
  addProduct(
    //@Body() completeBody : {title : string , description : string , ..... }
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('category') prodCategory: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedProdId = this.productsService.addProduct(
      prodTitle,
      prodDesc,
      prodCategory,
      prodPrice,
    );
    return { id: generatedProdId };
  }
  @Get()
  getAllProducts() {
    return { products: this.productsService.getProducts() };
  }

  @Get(':prodId')
  getProduct(@Param('prodId') prodId: string) {
    return { product: this.productsService.getProduct(prodId) };
  }

  @Patch(':prodId')
  updateProduct(
    @Param('prodId') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('category') prodCategory: string,
    @Body('price') prodPrice: number,
  ) {
    this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodCategory,
      prodPrice,
    );
    return { msg: 'Product updated successfull' };
  }
  @Delete(':prodId')
  removeProduct(@Param('prodId') prodId: string) {
    this.productsService.deleteProduct(prodId);
    return { msg: 'Product successfully deleted' };
  }
}
