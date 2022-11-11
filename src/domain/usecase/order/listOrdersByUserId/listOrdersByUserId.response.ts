import { ApiProperty } from "@nestjs/swagger";
import { Order } from "src/domain/model/interface/order.interface";
import { OrderDetail } from "src/domain/model/interface/orderDetail.interface";

export class OrderDetailListOrderByUserIdResponse {

  @ApiProperty()
  id: number;

  @ApiProperty()
  urlImage: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  salesPrice: number;

  constructor(detail: OrderDetail) {
    this.name = detail.product.name;
    this.type = detail.product.category.name
    this.quantity = detail.quantity
    this.salesPrice = detail.salesPrice;
    this.urlImage = detail.product.urlImage;
  }
}

export class ListOrderByUserIdResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  orderStatusId: number;

  @ApiProperty()
  orderStatus: string;

  @ApiProperty()
  estimatedDate: Date;

  @ApiProperty()
  address: string;

  @ApiProperty()
  comments: string;

  @ApiProperty({ type: OrderDetailListOrderByUserIdResponse, isArray: true })
  orderDetails: OrderDetailListOrderByUserIdResponse[];

  @ApiProperty()
  punctuation: number;

  @ApiProperty()
  postComments: string;

  constructor(order: Order) {
    this.id = order.id;
    this.orderStatusId = order.orderStatus.id;
    this.orderStatus = order.orderStatus.name;
    this.estimatedDate = order.estimatedDate;
    this.address = order.address;
    this.comments = order.comments;
    this.punctuation = order.punctuation;
    this.postComments = order.postComments;
    this.orderDetails = order.orderDetails.map(item => new OrderDetailListOrderByUserIdResponse(item))
  }
}