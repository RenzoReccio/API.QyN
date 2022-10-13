// import { ApiProperty } from "@nestjs/swagger";
// import { Order } from "./interface/order.interface";
// import { OrderDetail } from "./interface/orderDetail.interface";
// import { Product } from "./interface/product.interface";
// import { ProductModel } from "./product.model";

// export class OrderDetailModel implements OrderDetail {
//   @ApiProperty()
//   id: number;

//   @ApiProperty()
//   order: Order;

//   @ApiProperty({ type: ProductModel })
//   product: Product;

//   @ApiProperty()
//   quantity: number;

//   constructor(
//     id: number, order: Order, product: Product,
//     quantity: number
//   ) {
//     this.id = id;
//     this.order = order;
//     this.product = product;
//     this.quantity = quantity;
//   }
// }