import { Module } from '@nestjs/common';
import { ProductsController } from './products.contollers';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { ProductSchema } from './product.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Products', schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductModule {}
